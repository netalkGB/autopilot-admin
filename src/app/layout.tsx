import { IBM_Plex_Sans_JP } from 'next/font/google'
import type { Metadata } from 'next'
import ModalPortal from '@/components/modal/ModalPortal'
import BaseModal from '@/components/modal/BaseModal'
import type { MenuItem } from '@/components/menu/Menu'
import HomeIcon from '@/components/icon/HomeIcon'
import RssIcon from '@/components/icon/RssIcon'
import HistoryIcon from '@/components/icon/HistoryIcon'
import SettingsIcon from '@/components/icon/SettingsIcon'
import type { AccountMenuItem } from '@/components/accountmenu/AccountMenu'
import LogoutIcon from '@/components/icon/LogoutIcon'
import Main from '@/components/main/Main'
import { UserName } from '@/app/UserName'
import BaseDialog from '@/components/modal/BaseDialog'

export const metadata: Metadata = {
  title: 'Autopilot',
  description: 'Autopilot console'
}

interface RootLayoutProps {
  children: React.ReactNode
}

const IBMPlexSansJP = IBM_Plex_Sans_JP({
  weight: '400',
  subsets: ['latin']
})

export default function RootLayout ({
  children
}: RootLayoutProps): React.ReactNode {
  const menuItems: MenuItem[] = [
    {
      icon: <HomeIcon width={'14px'} height={'14px'}/>,
      item: 'Home',
      to: '/'
    },
    {
      icon: <RssIcon width={'14px'} height={'14px'}/>,
      item: 'Feed',
      to: '/feed'
    },
    {
      icon: <HistoryIcon width={'14px'} height={'14px'}/>,
      item: 'History',
      to: '/history'
    },
    {
      icon: <SettingsIcon width={'14px'} height={'14px'}/>,
      item: 'Settings',
      to: '/settings'
    }
  ]

  const accountMenuItems: AccountMenuItem[] = [
    {
      icon: <LogoutIcon width={'14px'} height={'14px'}/>,
      item: 'Logout'
    }
  ]

  return (
    <html className={IBMPlexSansJP.className}>
      <body>
      <Main appIconSrc={'/o.png'} userName={<UserName />} accountMenuItems={accountMenuItems} menuItems={menuItems} content={children} />
      <ModalPortal>
        <BaseModal />
        <BaseDialog />
      </ModalPortal>
      </body>
    </html>
  )
}
