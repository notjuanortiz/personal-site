import type { BlogPost, NavItem, Project, SocialLink } from '@/types'

// ─── Navigation ───────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: 'blog',     href: '/blog' },
  { label: 'projects', href: '/projects' },
  { label: 'about',    href: '/#about' },
]

// ─── Social ───────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'twitter',   href: 'https://twitter.com/yourhandle',      icon: 'twitter' },
  { label: 'github',    href: 'https://github.com/notjuanortiz',     icon: 'github' },
  { label: 'linkedin',  href: 'https://linkedin.com/in/juanortiz325', icon: 'linkedin' },
  { label: 'instagram', href: 'https://instagram.com/badwitkid',    icon: 'instagram' },
]

// ─── Blog Posts ───────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'zero-copy-parser-rust',
    title: 'Writing a Zero-Copy Parser in Rust Without Losing Your Mind',
    date: '2024-11-12',
    tags: ['rust', 'systems'],
    excerpt: 'Lifetimes, borrows, and the existential dread of fighting the borrow checker at 2am. A field report.',
    readingTime: 8,
  },
  {
    slug: 'typescript-patterns',
    title: 'TypeScript Patterns I Wish I\'d Known Earlier',
    date: '2024-10-03',
    tags: ['typescript', 'dx'],
    excerpt: 'Discriminated unions, template literal types, and other type-level wizardry that makes your codebase feel alive.',
    readingTime: 6,
  },
  {
    slug: 'over-engineered-blog',
    title: 'I Over-Engineered My Blog and Here\'s What I Learned',
    date: '2024-09-18',
    tags: ['infrastructure', 'k8s'],
    excerpt: 'Kubernetes for a static site. 3 CDNs. A distributed cache. Was it worth it? (No. But also yes.)',
    readingTime: 5,
  },
  {
    slug: 'senior-engineering',
    title: 'On Senior Engineering: Beyond Writing Good Code',
    date: '2024-08-01',
    tags: ['career', 'growth'],
    excerpt: 'What actually changes when you level up. Spoiler: it\'s mostly about communication, clarity, and knowing when not to code.',
    readingTime: 7,
  },
  {
    slug: 'anatomy-pull-request',
    title: 'Anatomy of a Great Pull Request',
    date: '2024-06-22',
    tags: ['open-source', 'git'],
    excerpt: 'Small, focused, well-described PRs aren\'t just a courtesy — they\'re the highest-leverage thing you can do for your team.',
    readingTime: 4,
  },
  {
    slug: 'consistent-hashing',
    title: 'The Beauty of Consistent Hashing (and When to Use It)',
    date: '2024-05-14',
    tags: ['algorithms', 'deep-dive'],
    excerpt: 'A visual and intuitive guide to one of distributed systems\' most elegant primitives, with real-world examples.',
    readingTime: 10,
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    slug: 'termdb',
    name: 'termdb',
    icon: '⚙️',
    description:
      'A lightweight embedded key-value store written in Rust with an LSM-tree backend. Supports atomic transactions, compaction, and a Redis-compatible wire protocol.',
    status: 'active',
    stats: { commits: 847, pullRequests: 63, stars: 1200 },
    links: {
      github: 'https://github.com/yourusername/termdb',
      live: 'https://termdb.dev',
    },
  },
  {
    slug: 'heliograph',
    name: 'heliograph',
    icon: '🔭',
    description:
      'Real-time distributed tracing visualizer. Ingests OpenTelemetry spans and renders flame graphs with sub-millisecond precision in the browser. Zero-config drop-in for existing OTEL pipelines.',
    status: 'active',
    stats: { commits: 412, pullRequests: 38, stars: 389 },
    links: {
      github: 'https://github.com/yourusername/heliograph',
      live: 'https://heliograph.io',
    },
  },
  {
    slug: 'codestream',
    name: 'codestream',
    icon: '📟',
    description:
      'VS Code extension that live-streams your editor state to a read-only shareable URL. Built for pair programming, live demos, and screen-share-free teaching.',
    status: 'wip',
    stats: { commits: 134, pullRequests: 11, stars: 74 },
    links: {
      github: 'https://github.com/yourusername/codestream',
      blogPost: 'over-engineered-blog',
    },
  },
  {
    slug: 'meshpeer',
    name: 'meshpeer',
    icon: '🌐',
    description:
      'Zero-config mesh networking daemon for homelab clusters. Automatically discovers nodes, negotiates WireGuard tunnels, and manages routing tables. Superseded by Tailscale for most use cases.',
    status: 'archived',
    stats: { commits: 291, pullRequests: 29, stars: 218 },
    links: {
      github: 'https://github.com/yourusername/meshpeer',
      blogPost: 'over-engineered-blog',
    },
  },
]
