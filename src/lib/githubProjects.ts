'use server'

import type { Project } from '@/types'
import { PROJECTS } from '@/lib/data'

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'
const FOURTEEN_DAYS_SECONDS = 60 * 60 * 24 * 14

type GithubRepoCoordinates = {
  owner: string
  name: string
  projectSlug: string
}

type GithubRepositoryNode = {
  stargazerCount?: number
  pullRequests?: {
    totalCount?: number
  }
  defaultBranchRef?: {
    target?: {
      history?: {
        totalCount?: number
      }
    }
  }
}

type GithubGraphqlResponse = {
  data?: Record<string, GithubRepositoryNode | null>
  errors?: Array<{ message: string }>
}

function extractRepoFromUrl(url: string | undefined | null): { owner: string; name: string } | null {
  if (!url) return null

  try {
    const parsed = new URL(url)

    if (parsed.hostname !== 'github.com') {
      return null
    }

    const segments = parsed.pathname.split('/').filter(Boolean)
    if (segments.length < 2) {
      return null
    }

    const [owner, name] = segments
    if (!owner || !name) {
      return null
    }

    return { owner, name }
  } catch {
    console.error(
      `[githubProjects] Failed to parse GitHub URL "${url}". ` +
        'Ensure the URL is a valid https://github.com/{owner}/{repo} link.',
    )
    return null
  }
}

export async function getProjectsWithGithubStats(
  projects: Project[] = PROJECTS,
): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    console.error(
      '[githubProjects] Missing GITHUB_TOKEN environment variable. ' +
        'Falling back to static PROJECTS stats. ' +
        'To enable live GitHub stats, create a personal access token and set GITHUB_TOKEN in .env.local.',
    )
    return projects
  }

  const repoCoordinates: GithubRepoCoordinates[] = projects
    .map((project) => {
      const githubUrl = (project as any).links?.github as string | undefined
      if (!githubUrl) return null

      const repo = extractRepoFromUrl(githubUrl)
      if (!repo) {
        console.error(
          `[githubProjects] Could not extract owner/repo from GitHub URL "${githubUrl}" for project "${project.slug}".`,
        )
        return null
      }

      return {
        owner: repo.owner,
        name: repo.name,
        projectSlug: project.slug,
      }
    })
    .filter((value): value is GithubRepoCoordinates => value !== null)

  if (repoCoordinates.length === 0) {
    return projects
  }

  // Build a single GraphQL query with one repository field per project
  const selectionSet = repoCoordinates
    .map(
      (repo, index) => `
  repo${index}: repository(owner: "${repo.owner}", name: "${repo.name}") {
    stargazerCount
    pullRequests(states: MERGED) {
      totalCount
    }
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 0) {
            totalCount
          }
        }
      }
    }
  }`,
    )
    .join('\n')

  const query = `query ProjectsStats {
${selectionSet}
}`

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      // Cache on the server and revalidate every 14 days
      cache: 'force-cache',
      next: { revalidate: FOURTEEN_DAYS_SECONDS },
    })

    if (!response.ok) {
      console.error(
        `[githubProjects] GitHub GraphQL request failed with status ${response.status}. ` +
          'Falling back to static PROJECTS stats. ' +
          'Verify that your GITHUB_TOKEN has access and that you are not rate limited.',
      )
      return projects
    }

    const payload = (await response.json()) as GithubGraphqlResponse

    if (payload.errors && payload.errors.length > 0) {
      console.error(
        '[githubProjects] GitHub GraphQL returned errors: ' +
          payload.errors.map((e) => e.message).join(' | '),
      )
      // We still try to use any partial data in payload.data below.
    }

    const updatedBySlug = new Map<string, Project>()

    projects.forEach((project) => {
      const coordIndex = repoCoordinates.findIndex(
        (coord) => coord.projectSlug === project.slug,
      )

      if (coordIndex === -1) {
        updatedBySlug.set(project.slug, project)
        return
      }

      const repoKey = `repo${coordIndex}`
      const repoNode = payload.data?.[repoKey]

      if (!repoNode) {
        // No data for this repo; fall back to static stats
        updatedBySlug.set(project.slug, project)
        return
      }

      const stars =
        typeof repoNode.stargazerCount === 'number'
          ? repoNode.stargazerCount
          : project.stats?.stars

      const pullRequests =
        typeof repoNode.pullRequests?.totalCount === 'number'
          ? repoNode.pullRequests.totalCount
          : project.stats?.pullRequests

      const commitsFromHistory =
        repoNode.defaultBranchRef?.target?.history?.totalCount

      const commits =
        typeof commitsFromHistory === 'number'
          ? commitsFromHistory
          : project.stats?.commits

      updatedBySlug.set(project.slug, {
        ...project,
        stats: {
          ...project.stats,
          stars: stars ?? project.stats?.stars ?? 0,
          pullRequests: pullRequests ?? project.stats?.pullRequests ?? 0,
          commits: commits ?? project.stats?.commits ?? 0,
        },
      })
    })

    return projects.map((project) => updatedBySlug.get(project.slug) ?? project)
  } catch (error) {
    console.error(
      '[githubProjects] Unexpected error while fetching GitHub stats. ' +
        'Falling back to static PROJECTS stats. ' +
        'Check network connectivity and your GITHUB_TOKEN configuration.',
      error,
    )
    return projects
  }
}

