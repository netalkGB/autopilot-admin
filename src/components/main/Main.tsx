'use client'
import Header from '@/components/header/Header'
import AppContent from '@/components/appcontent/AppContent'
import { type MenuItem } from '@/components/menu/Menu'
import { type AccountMenuItem } from '@/components/accountmenu/AccountMenu'

interface MainProps {
  appIconSrc: string
  userName: React.ReactNode
  accountMenuItems: AccountMenuItem[]
  menuItems: MenuItem[]
  content: React.ReactNode
}

export default function Main ({ appIconSrc, userName, accountMenuItems, menuItems, content }: MainProps): React.ReactNode {
  return (
    <>
      <Header imgSrc={appIconSrc} userName={userName} menuItems={accountMenuItems} />
      <AppContent menuItems={menuItems} content={content} />
    </>
  )
}
