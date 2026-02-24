// ─── Blog ──────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readingTime: number // minutes
}

// ─── Projects ─────────────────────────────────────────────────────────────

export type ProjectStatus = 'active' | 'wip' | 'archived'

export interface Project {
  slug: string
  name: string
  icon: string
  description: string
  status: ProjectStatus
  stats: {
    commits: number
    pullRequests: number
    stars: number
  }
  links: {
    github: string
    live?: string      // external website
    blogPost?: string  // internal blog post slug
  }
}

// ─── Navigation ───────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

// ─── Social ───────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string
  href: string
  icon: 'twitter' | 'github' | 'linkedin' | 'instagram'
}
