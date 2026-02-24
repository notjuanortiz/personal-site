import Link from 'next/link'
import { SOCIAL_LINKS } from '@/lib/data'
import { SocialIcon } from '@/components/ui/SocialIcon'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        Built with caffeine &amp; cursor · © {new Date().getFullYear()}
      </p>

      <ul className={styles.social} role="list" aria-label="Social links">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={link.label}
            >
              <SocialIcon name={link.icon} />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
