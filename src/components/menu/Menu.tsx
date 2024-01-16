'use client'
import styles from '@/components/menu/menu.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface MenuItem {
  icon: React.ReactNode
  item: React.ReactNode
  to: string
}

interface MenuProps {
  items: MenuItem[]
}

export default function Menu ({ items }: MenuProps): React.ReactNode {
  const pathname = usePathname()

  return (
    <div className={`${styles.menuArea} ${styles.menuPartition}`}>
      {
        items.map((item: MenuItem, index: number) => {
          return (
            <Link href={item.to} className={styles.menuItemWrapper} onClick={() => {}} key={index}>
              <div className={`${styles.menuItem} ${checkActivePage(pathname, item.to)}`}>
                <div className={styles.menuItemIconContainer}>
                  <div>
                    {item.icon}
                  </div>
                </div>
                <div>
                  {item.item}
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

function checkActivePage (pathname: string, page: string): string {
  return pathname === page ? styles.menuItemActive : ''
}
