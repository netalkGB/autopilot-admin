'use client'
import styles from '@/components/appcontent/content.module.css'
import Menu, { type MenuItem } from '@/components/menu/Menu'
import Content from '@/components/content/Content'

interface AppContentProps {
  content: React.ReactNode
  menuItems: MenuItem[]
}

export default function AppContent ({ content, menuItems }: AppContentProps): React.ReactNode {
  return (
    <>
      <div className={styles.container}>
        <Menu items={menuItems} />
        <Content>
          {content}
        </Content>
      </div>
    </>
  )
}
