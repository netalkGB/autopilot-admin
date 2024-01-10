import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autopilot',
  description: 'Autopilot console',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
