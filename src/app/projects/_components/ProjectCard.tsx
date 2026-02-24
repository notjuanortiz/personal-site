import Link from 'next/link'
import type { Project } from '@/types'
import { formatCount } from '@/lib/utils'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
  animDelay?: number
}

export function ProjectCard({ project, animDelay = 0 }: Props) {
  const { name, icon, description, status, stats, links } = project

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${animDelay}s` }}
      data-status={status}
    >
      {/* ── Icon column ────────────────────────────── */}
      <div className={styles.iconCol} aria-hidden="true">
        <div className={styles.iconBox}>{icon}</div>
      </div>

      {/* ── Body ───────────────────────────────────── */}
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3>{name}</h3>
        </div>

        <p className={styles.description}>{description}</p>

        {/* Stats */}
        <dl className={styles.stats}>
          <div className={`${styles.statItem} ${styles.commits}`}>
            <CommitIcon />
            <dd><span className={styles.statVal}>{formatCount(stats.commits)}</span> commits</dd>
          </div>
          <div className={`${styles.statItem} ${styles.prs}`}>
            <PullRequestIcon />
            <dd><span className={styles.statVal}>{stats.pullRequests}</span> pull requests</dd>
          </div>
          <div className={`${styles.statItem} ${styles.stars}`}>
            <StarIcon />
            <dd><span className={styles.statVal}>{formatCount(stats.stars)}</span> stars</dd>
          </div>
        </dl>
      </div>

      {/* ── Actions ────────────────────────────────── */}
      <div className={styles.actions}>
        <Link
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.actionBtn} ${styles.btnGithub}`}
        >
          <GithubIcon />
          GitHub
        </Link>

        {links.live && (
          <Link
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionBtn} ${styles.btnLive}`}
          >
            <ExternalLinkIcon />
            Live Site
          </Link>
        )}

        {links.blogPost && (
          <Link
            href={`/blog/${links.blogPost}`}
            className={`${styles.actionBtn} ${styles.btnBlog}`}
          >
            <DocIcon />
            Blog Post
          </Link>
        )}
      </div>
    </article>
  )
}

/* ── Inline SVG Icons ─────────────────────────────────── */

function CommitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx={12} cy={12} r={3} />
      <line x1={3} y1={12} x2={9} y2={12} />
      <line x1={15} y1={12} x2={21} y2={12} />
    </svg>
  )
}

function PullRequestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx={6} cy={6} r={2} />
      <circle cx={6} cy={18} r={2} />
      <circle cx={18} cy={8} r={2} />
      <line x1={6} y1={8} x2={6} y2={16} />
      <path d="M18 10c0 4-3 6-6 6H9" />
      <polyline points="7 15 9 16 7 17" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1={10} y1={14} x2={21} y2={3} />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1={16} y1={13} x2={8} y2={13} />
      <line x1={16} y1={17} x2={8} y2={17} />
    </svg>
  )
}
