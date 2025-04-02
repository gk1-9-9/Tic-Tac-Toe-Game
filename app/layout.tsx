import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Simple Tic-Tac-Toe game built with Next.js and React',
  icons: {
    icon: '/download.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/download.jpeg" type="image/jpg" />

      </head>
      <body>{children}</body>
    </html>
  )
}