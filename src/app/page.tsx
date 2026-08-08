import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Juan P. Ortiz',
}

export default function HomePage() {
  const recentPosts = BLOG_POSTS.slice(0, 6)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <p className={styles.promptLine}>
              <span>root@notjuanortiz</span>:~$ whoami
            </p>
            <h1>
              Hello,<br />I&apos;m <em>Your Name</em>.
            </h1>
            <p className={styles.heroDesc}>
              I build things for the web.<br />
              <strong>Software engineer</strong> · open-source tinkerer · occasional writer.<br />
              Currently: making the internet a weirder, better place.
            </p>
            <div className={styles.btnGroup}>
              <Link href="/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                ./view_projects
              </Link>
              <Link href="/#about" className={`${styles.btn} ${styles.btnGhost}`}>
                man notjuanortiz
              </Link>
            </div>
          </div>

          <div className={styles.terminalWindow} aria-label="Terminal preview">
            <div className={styles.termBar}>
              <span className={`${styles.dot} ${styles.dotR}`} />
              <span className={`${styles.dot} ${styles.dotY}`} />
              <span className={`${styles.dot} ${styles.dotG}`} />
              <span className={styles.termTitle}>notjuanortiz@local — bash — 80×24</span>
            </div>
            <div className={styles.termBody}>
              <p><span className={styles.tP}>→</span> <span className={styles.tV}>cat</span> about.json</p>
              <p><span className={styles.tC}>{'{'}</span></p>
              <p>&nbsp;&nbsp;<span className={styles.tS}>&quot;name&quot;</span><span className={styles.tC}>:</span> <span className={styles.tV}>&quot;Juan P. Ortiz&quot;</span><span className={styles.tC}>,</span></p>
              <p>&nbsp;&nbsp;<span className={styles.tS}>&quot;role&quot;</span><span className={styles.tC}>:</span> <span className={styles.tV}>&quot;Software Engineer&quot;</span><span className={styles.tC}>,</span></p>
              <p>&nbsp;&nbsp;<span className={styles.tS}>&quot;location&quot;</span><span className={styles.tC}>:</span> <span className={styles.tV}>&quot;New York, NY&quot;</span><span className={styles.tC}>,</span></p>
              <p>&nbsp;&nbsp;<span className={styles.tS}>&quot;stack&quot;</span><span className={styles.tC}>:</span> <span className={styles.tC}>[</span></p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tV}>&quot;TypeScript&quot;</span><span className={styles.tC}>,</span> <span className={styles.tV}>&quot;Java&quot;</span><span className={styles.tC}>,</span> <span className={styles.tV}>&quot;Go&quot;</span></p>
              <p>&nbsp;&nbsp;<span className={styles.tC}>],</span></p>
              <p>&nbsp;&nbsp;<span className={styles.tS}>&quot;status&quot;</span><span className={styles.tC}>:</span> <span className={styles.tE}>&quot;open_to_work: true&quot;</span></p>
              <p><span className={styles.tC}>{'}'}</span></p>
              <br />
              <p><span className={styles.tP}>→</span> <span className={styles.cursor} aria-hidden="true" /></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────── */}
      <section id="blog" className={styles.section} aria-labelledby="blog-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTag}>blog</p>
          <h2 id="blog-heading">Recent <span>Posts</span></h2>
        </div>

        <ul className={styles.postsGrid} role="list">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={styles.postCard}>
                <div className={styles.postMeta}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className={styles.postRead} aria-hidden="true">read_more</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── ABOUT ────────────────────────────────────── */}
      <section id="about" className={styles.section} aria-labelledby="about-heading">
        <div className={styles.aboutInner}>
          <div>
            <div className={styles.sectionHeader} style={{ marginBottom: '2rem' }}>
              <p className={styles.sectionTag}>about</p>
              <h2 id="about-heading">About <span>Me</span></h2>
            </div>

            <div className={styles.aboutText}>
              <p>I&apos;m a <strong>software engineer</strong> with a deep love for systems programming, developer tooling, and open-source software. I&apos;ve been writing code professionally for <em>7+ years</em>, and recreationally for much longer.</p>
              <p>My current obsessions are <strong>Rust</strong>, distributed systems, and building tools that make other developers more productive. I believe in <em>simple, observable, debuggable</em> software.</p>
              <p>When I&apos;m not at a keyboard, I&apos;m probably hiking somewhere remote, reading dense technical papers, or learning something completely unrelated to computers.</p>
              <p>This site is my corner of the internet. No tracking, no ads, no newsletter popups. Just <strong>text and ideas</strong>.</p>
            </div>

            <dl className={styles.statGrid}>
              {[
                { value: '7+',  label: 'years coding' },
                { value: '42',  label: 'oss projects' },
                { value: '89k', label: 'lines written' },
                { value: '∞',   label: 'bugs fixed' },
              ].map(({ value, label }) => (
                <div key={label} className={styles.stat}>
                  <dd className={styles.statValue}>{value}</dd>
                  <dt className={styles.statLabel}>{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
