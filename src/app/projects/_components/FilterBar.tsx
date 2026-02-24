'use client'

import { useState } from 'react'
import type { ProjectStatus } from '@/types'
import styles from './FilterBar.module.css'

type Filter = ProjectStatus | 'all'

interface Props {
  totalCount: number
}

export function FilterBar({ totalCount }: Props) {
  const [active, setActive] = useState<Filter>('all')

  function handleFilter(filter: Filter) {
    setActive(filter)

    // Show/hide project list items in the server-rendered DOM
    const items = document.querySelectorAll<HTMLLIElement>('#projects-list li')
    let visible = 0
    items.forEach((li) => {
      const status = li.getAttribute('data-status') as ProjectStatus
      const show = filter === 'all' || status === filter
      li.style.display = show ? '' : 'none'
      if (show) visible++
    })

    // Update section headings visibility
    const sections = document.querySelectorAll<HTMLElement>('#projects-list section')
    sections.forEach((section) => {
      const visibleChildren = section.querySelectorAll<HTMLLIElement>('li:not([style*="none"])')
      section.style.display = visibleChildren.length === 0 ? 'none' : ''
    })

    setVisibleCount(visible)
  }

  const [visibleCount, setVisibleCount] = useState(totalCount)

  const FILTERS: { label: string; value: Filter }[] = [
    { label: 'all',      value: 'all' },
    { label: 'active',   value: 'active' },
    { label: 'wip',      value: 'wip' },
    { label: 'archived', value: 'archived' },
  ]

  return (
    <div className={styles.filterBar}>
      <span className={styles.label}>filter:</span>
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          className={`${styles.btn} ${active === value ? styles.btnActive : ''}`}
          onClick={() => handleFilter(value)}
          aria-pressed={active === value}
        >
          {label}
        </button>
      ))}
      <span className={styles.count}>
        <strong>{visibleCount}</strong> projects
      </span>
    </div>
  )
}
