import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './not-found.module.css'

export const metadata: Metadata = { title: '404 — not found' }

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.prompt}><span>$</span> ls /requested-path</p>
      <h1>404</h1>
      <p className={styles.msg}>ls: cannot access &apos;/requested-path&apos;: No such file or directory</p>
      <Link href="/" className={styles.link}>cd ~/home</Link>
    </div>
  )
}
