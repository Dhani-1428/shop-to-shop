import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LanguageProvider } from '@/components/language-provider'
import { StoreProvider } from '@/components/store-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'ShopToShop - Premium Mobile Parts & Accessories',
  description: 'Your one-stop destination for premium mobile phone parts, accessories, and repair tools. Shop iPhone, Samsung, Xiaomi, and more.',
  keywords: 'mobile parts, phone repair, iPhone parts, Samsung parts, accessories, 50TEK, HOCO',
  generator: 'v0.app',
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

export const viewport: Viewport = {
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased`}>
        <LanguageProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
