import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://keystrike.vercel.app'),
  title: 'KeyStrike - Typing Speed Test & Learning Platform',
  description: 'Improve typing speed with real-time WPM tracking, accuracy analytics, and guided practice modes on KeyStrike.',
  keywords: [
    'typing speed test',
    'learn typing online',
    'typing practice with fingers',
    'wpm test free',
    'typing accuracy test',
    'typing trainer',
  ],
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KeyStrike - Typing Speed Test & Learning Platform',
    description: 'Improve typing speed with real-time WPM tracking, accuracy analytics, and guided practice modes.',
    url: 'https://keystrike.vercel.app',
    siteName: 'KeyStrike',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeyStrike - Typing Speed Test & Learning Platform',
    description: 'Improve typing speed with real-time WPM tracking and guided practice modes.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
