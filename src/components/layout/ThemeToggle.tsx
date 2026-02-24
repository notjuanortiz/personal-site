'use client'

import { useTheme } from './ThemeProvider'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      className={styles.btn}
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      [{theme === 'dark' ? 'light_mode' : 'dark_mode'}]
    </button>
  )
}
