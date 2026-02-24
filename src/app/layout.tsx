import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Juan P. Ortiz',
    default: 'Juan P. Ortiz',
  },
  description:
    'Software engineer. Open-source tinkerer. Occasional writer. Building things for the web.',
  metadataBase: new URL('https://notjuanortiz.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://notjuanortiz.com',
    siteName: 'Juan P. Ortiz',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@notjuanortiz',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#f4f0e8' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
