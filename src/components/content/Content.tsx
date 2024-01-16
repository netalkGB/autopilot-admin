'use client'

import styles from '@/components/content/content.module.css'

interface ContentProps {
  children: React.ReactNode
}

export default function Content ({ children }: ContentProps): React.ReactNode {
  return (
    <div className={styles.contentArea}>
      { children }
    </div>
  )
}
