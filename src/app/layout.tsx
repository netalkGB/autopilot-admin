import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autopilot',
  description: 'Autopilot console'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout ({
  children
}: RootLayoutProps): React.ReactNode {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
