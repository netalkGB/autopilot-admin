'use client'

import styles from '@/components/accountmenu/accountmenu.module.css'
import React, { useEffect } from 'react'
import DownIcon from '@/components/icon/DownIcon'

export interface AccountMenuItem {
  icon: React.ReactNode
  item: React.ReactNode
}

interface AccountMenuProps {
  userName: React.ReactNode
  items: AccountMenuItem[]
}

export default function AccountMenu ({ items, userName }: AccountMenuProps): React.ReactNode {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef?.current !== null && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  const handleMenuOpen = (): void => {
    setIsMenuOpen((isOpen: boolean) => !isOpen)
  }

  return (
    <div ref={menuRef}>
      <div className={`${styles.userDisplayArea}`} onClick={handleMenuOpen}>
        <div className={styles.accountInfo}>
          <div className={styles.accountName}>{userName}</div>
          <div className={styles.downIcon}><DownIcon width={'13px'} height={'12px'} /></div>
        </div>
      </div>
      {
        isMenuOpen &&
        (
          <div className={styles.accountPullDownMenu} onClick={handleMenuOpen}>
            <ul className={styles.menu}>
              {
                items.map((item: AccountMenuItem, index: number) => {
                  return (
                    <li className={styles.menuItem} onClick={() => {
                      if (item.item === 'Logout') {
                        const urlParams = new URLSearchParams()
                        urlParams.append('to', location.href)
                        const apServerLogout = (process.env.NEXT_PUBLIC_AP_SERVER_URI ?? '') + 'logout?' + urlParams.toString()

                        fetch('/api/logout', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        }).then(() => {
                          location.href = apServerLogout
                        }).catch(() => {
                          location.href = apServerLogout
                        })
                      }
                    }} key={index}>
                      <div className={styles.menuItemIconArea}><div>{item.icon}</div></div>
                      <div className={styles.menuItemText}>{item.item}</div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}
