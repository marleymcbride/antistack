import React from 'react'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = localFont({
  src: [
    { path: '../fonts/Inter-Regular.woff2', weight: '400' },
    { path: '../fonts/Inter-Medium.woff2', weight: '500' },
    { path: '../fonts/Inter-Bold.woff2', weight: '700' }
  ],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: '3 Weeks to Jumping Out Of Bed | Marley McBride',
  description: 'Discover how to triple your energy levels in just 21 days with the Limitless Protocol.',
  keywords: ['energy', 'fitness', 'coaching', 'health', 'productivity'],
  authors: [{ name: 'Marley McBride' }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
