import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import styles from './page.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

// Pre-render all blog post routes at build time
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <article className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">~/yourname</Link>
        <span>/</span>
        <Link href="/blog">blog</Link>
        <span>/</span>
        <span>{post.slug}</span>
      </nav>

      <header className={styles.postHeader}>
        <div className={styles.postMeta}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </div>
        <h1>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </header>

      {/* Placeholder for MDX content */}
      <div className={styles.content}>
        <div className={styles.placeholder}>
          <p className={styles.placeholderPrompt}>
            <span>$</span> cat {post.slug}.mdx
          </p>
          <p className={styles.placeholderMsg}>
            // Post content goes here. Connect an MDX source or CMS.
          </p>
        </div>
      </div>

      <footer className={styles.postFooter}>
        <Link href="/blog" className={styles.backLink}>
          ← back to all posts
        </Link>
      </footer>
    </article>
  )
}
