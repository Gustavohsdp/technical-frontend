import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'

import { Providers } from '@/providers'

import { ReactNode } from 'react'
import '../styles/global.css'

export const metadata: Metadata = {
  applicationName: 'E-commerce',
  keywords: [
    'Ecommerce',
    'React',
    'Next.js',
    'Node.js',
    'Tailwindcss',
    'Radix UI',
  ],
  authors: [
    { name: 'Gustavo Henrique', url: 'https://github.com/Gustavohsdp' },
  ],
  colorScheme: 'dark',
  creator: 'Gustavo Henrique',
  publisher: 'Gustavo Henrique',
  openGraph: {
    title: 'E-commerce',
    description: 'Projeto de E-commerce para teste técnico.',
    url: 'https://google.com',
    siteName: 'E-commerce',
    locale: 'pt-BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  title: {
    default: 'E-commerce',
    template: '%s | Teste técnico',
  },
  description: 'Projeto de E-commerce para teste técnico.',
  icons: {
    icon: '/assets/favicon.ico',
  },
}

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="pt"
      className={`${openSans.variable} ${inter.variable} scroll-smooth`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
