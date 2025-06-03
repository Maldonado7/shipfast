import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import { DevTools } from '@/lib/devtools'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Next.js 2025 Template - Future of Web Development',
    template: '%s | Next.js 2025 Template',
  },
  description: 'Experience the future of web development with our cutting-edge Next.js 15 template featuring Supabase, 2025 design trends, real-time capabilities, and unmatched developer experience.',
  keywords: [
    'Next.js 15', 
    'React 19', 
    'TypeScript', 
    'Supabase', 
    'Full-Stack', 
    '2025 Design', 
    'Brutalist UI', 
    'Y2K Revival', 
    'Gaming UI', 
    'Real-time', 
    'Modern Template'
  ],
  authors: [{ name: 'Claude Code' }],
  creator: 'Claude Code',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Next.js 2025 Template - Future of Web Development',
    description: 'Experience cutting-edge design trends, blazing-fast performance, and unmatched developer experience with our modern Next.js template.',
    siteName: 'Next.js 2025 Template',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js 2025 Template - Future of Web Development',
    description: 'Experience cutting-edge design trends, blazing-fast performance, and unmatched developer experience.',
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <DevTools>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </DevTools>
      </body>
    </html>
  )
}