import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/data'
import { ThemeToggle } from './ThemeToggle'
import styles from './Header.module.css'

// Server Component — only ThemeToggle inside is a Client Component
export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        ~/<span>notjuanortiz</span>
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navLink}>
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  )
}
