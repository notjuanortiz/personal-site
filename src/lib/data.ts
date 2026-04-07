import type { BlogPost, NavItem, Project, SocialLink } from '@/types'

// ─── Navigation ───────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: 'blog',     href: '/blog' },
  { label: 'projects', href: '/projects' },
  { label: 'about',    href: '/#about' },
]

// ─── Social ───────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'twitter',   href: 'https://twitter.com/notjuanortiz',      icon: 'twitter' },
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
    slug: 'farmcare',
    name: 'farmcare',
    icon: '🌾',
    description:
      'A farm operations platform that centralizes planning, tracking, and discovery workflows so teams can improve yield decisions and reduce day-to-day coordination overhead.',
    status: 'active',
    stats: { commits: 0, pullRequests: 0, stars: 0 },
    links: {
      github: 'https://github.com/notjuanortiz/farmcare',
    },
  },
  {
    slug: 'sensorhub',
    name: 'sensorhub',
    icon: '🛰️',
    description:
      'A hardware-agnostic sensor orchestration platform that standardizes device telemetry and health monitoring, helping operations teams detect issues earlier and reduce unplanned downtime.',
    status: 'active',
    stats: { commits: 0, pullRequests: 0, stars: 0 },
    links: {
      github: 'https://github.com/notjuanortiz/sensorhub',
    },
  },
  {
    slug: 'travelab',
    name: 'travelab',
    icon: '✈️',
    description:
      'A flight management API focused on clean domain modeling and reliable scheduling workflows, designed to support operational visibility and safer decision-making for travel systems.',
    status: 'wip',
    stats: { commits: 0, pullRequests: 0, stars: 0 },
    links: {
      github: 'https://github.com/notjuanortiz/travelab',
    },
  },
  {
    slug: 'travelab-site',
    name: 'travelab-site',
    icon: '🧭',
    description:
      'A web dashboard for flight operations that surfaces scheduling and planning data in one place, improving cross-team communication and reducing manual status handoffs.',
    status: 'archived',
    stats: { commits: 0, pullRequests: 0, stars: 0 },
    links: {
      github: 'https://github.com/notjuanortiz/travelab-site',
    },
  },
  {
    slug: 'texas-holdem',
    name: 'texas-holdem',
    icon: '♠️',
    description:
      "A command-line Texas Hold'em simulator that models game-state transitions and probability-driven outcomes, showcasing practical algorithm design and testable business logic.",
    status: 'active',
    stats: { commits: 0, pullRequests: 0, stars: 1 },
    links: {
      github: 'https://github.com/notjuanortiz/texas-holdem',
    },
  },
]
