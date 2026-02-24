import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on Rust, TypeScript, distributed systems, and software engineering.',
}

export default function BlogPage() {
  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">~/yourname</Link>
        <span>/</span>
        <span>blog</span>
      </nav>

      <header className={styles.pageHero}>
        <h1>
          Writing &amp; <em>Notes</em>
        </h1>
        <p>Thoughts on systems programming, developer tooling, and the craft of building software.</p>
      </header>

      <ul className={styles.postList} role="list">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className={styles.postRow}>
              <div className={styles.postLeft}>
                <div className={styles.postMeta}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <h2>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
              <div className={styles.postRight}>
                <time dateTime={post.date} className={styles.date}>{formatDate(post.date)}</time>
                <span className={styles.readTime}>{post.readingTime} min read</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
