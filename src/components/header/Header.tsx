'use client'
import styles from '@/components/header/header.module.css'
import Image from 'next/image'
import AccountMenu, { type AccountMenuItem } from '@/components/accountmenu/AccountMenu'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  imgSrc: string
  userName: string
  menuItems: AccountMenuItem[]
}

export default function Header ({ imgSrc, userName, menuItems }: HeaderProps): React.ReactNode {
  const router = useRouter()

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={`${styles.centeringVertical}`}>
          <Image
            src={imgSrc}
            height={300}
            width={300}
            alt="o"
            className={`${styles.logo} ${styles.logoWrapper}`}
            onClick={() => { router.push('/') }}
          />
        </div>
        <div>
          <AccountMenu userName={userName} items={menuItems} />
        </div>
      </div>
    </div>
  )
}
