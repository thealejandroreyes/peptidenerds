import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Peptide Nerds — Evidence-Based Peptide Guide',
    template: '%s | Peptide Nerds',
  },
  description:
    'The evidence-based guide to peptides for weight loss. GLP-1 comparisons, dosing protocols, side effect management, and research-backed recommendations.',
  metadataBase: new URL('https://peptidenerds.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Peptide Nerds',
  },
  twitter: {
    card: 'summary_large_image',
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased bg-background text-foreground`}>
        <Header />
        <DisclaimerBanner />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
