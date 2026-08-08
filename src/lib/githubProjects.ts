'use server'

import type { Project } from '@/types'
import { PROJECTS } from '@/lib/data'

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'
const FOURTEEN_DAYS_SECONDS = 60 * 60 * 24 * 14
const REPO_ALIAS_PREFIX = 'repoBySlug_'

type GithubRepoCoordinates = {
  owner: string
  name: string
  projectSlug: string
  alias: string
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

function sanitizeAliasSegment(value: string): string {
  const sanitized = value.replace(/[^a-zA-Z0-9_]/g, '_')
  return sanitized.length > 0 ? sanitized : 'unknown'
}

function createRepoAlias(projectSlug: string): string {
  return `${REPO_ALIAS_PREFIX}${sanitizeAliasSegment(projectSlug)}`
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

function extractProjectRepoCoordinates(project: Project): GithubRepoCoordinates | null {
  const repo = extractRepoFromUrl(project.links.github)
  if (!repo) {
    console.error(
      `[githubProjects] Could not extract owner/repo from GitHub URL "${project.links.github}" for project "${project.slug}".`,
    )
    return null
  }

  return {
    owner: repo.owner,
    name: repo.name,
    projectSlug: project.slug,
    alias: createRepoAlias(project.slug),
  }
}

function buildProjectsStatsQuery(repoCoordinates: GithubRepoCoordinates[]): string {
  const selectionSet = repoCoordinates
    .map(
      (repo) => `
  ${repo.alias}: repository(owner: "${repo.owner}", name: "${repo.name}") {
    stargazerCount
    pullRequests {
      totalCount
    }
    defaultBranchRef {
      target {
        ... on Commit {
          # GitHub requires first/last between 1 and 100.
          # We only need totalCount; requesting first: 1 keeps payload small.
          history(first: 1) {
            totalCount
          }
        }
      }
    }
  }`,
    )
    .join('\n')

  return `query ProjectsStats {
${selectionSet}
}`
}

function mergeProjectWithRepoStats(project: Project, repoNode: GithubRepositoryNode | null | undefined): Project {
  if (!repoNode) {
    return project
  }

  const stars =
    typeof repoNode.stargazerCount === 'number'
      ? repoNode.stargazerCount
      : project.stats?.stars

  const pullRequests =
    typeof repoNode.pullRequests?.totalCount === 'number'
      ? repoNode.pullRequests.totalCount
      : project.stats?.pullRequests

  const commitsFromHistory = repoNode.defaultBranchRef?.target?.history?.totalCount

  const commits =
    typeof commitsFromHistory === 'number'
      ? commitsFromHistory
      : project.stats?.commits

  return {
    ...project,
    stats: {
      ...project.stats,
      stars: stars ?? project.stats?.stars ?? 0,
      pullRequests: pullRequests ?? project.stats?.pullRequests ?? 0,
      commits: commits ?? project.stats?.commits ?? 0,
    },
  }
}

async function fetchGithubGraphqlPayload(
  token: string,
  query: string,
): Promise<GithubGraphqlResponse | null> {
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
    return null
  }

  return (await response.json()) as GithubGraphqlResponse
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
    .map(extractProjectRepoCoordinates)
    .filter((value): value is GithubRepoCoordinates => value !== null)

  if (repoCoordinates.length === 0) {
    return projects
  }

  const repoAliasBySlug = new Map<string, string>(
    repoCoordinates.map((coord) => [coord.projectSlug, coord.alias]),
  )

  const query = buildProjectsStatsQuery(repoCoordinates)

  try {
    const payload = await fetchGithubGraphqlPayload(token, query)
    if (!payload) {
      return projects
    }

    if (payload.errors && payload.errors.length > 0) {
      console.error(
        '[githubProjects] GitHub GraphQL returned errors: ' +
          payload.errors.map((e) => e.message).join(' | '),
      )
      // We still try to use any partial data in payload.data below.
    }

    return projects.map((project) => {
      const alias = repoAliasBySlug.get(project.slug)
      if (!alias) {
        return project
      }

      const repoNode = payload.data?.[alias]
      return mergeProjectWithRepoStats(project, repoNode)
    })
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

