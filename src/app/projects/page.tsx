import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjectsWithGithubStats } from '@/lib/githubProjects'
import { ProjectCard } from './_components/ProjectCard'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source work, experiments, and tools built and maintained by yourname.',
}

export default async function ProjectsPage() {
  const projects = await getProjectsWithGithubStats()

  return (
    <div className={styles.page}>
      {/* Page hero */}
      <div className={styles.pageHero}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">~/notjuanortiz</Link>
          <span>/</span>
          <span>projects</span>
        </nav>
        <h1>Personal <em>Projects</em></h1>
        <p>Open-source work, experiments, and tools I&apos;ve built and maintain. All source available on GitHub.</p>
      </div>

      {/* Projects rendered on the server */}
      <div className={styles.projectsContainer} id="projects-list">
        <ul className={styles.projectList} role="list">
          {projects.map((project, i) => (
            <li key={project.slug} data-status={project.status}>
              <ProjectCard project={project} animDelay={i * 0.05} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
