import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import '@/styles/main.scss'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import '@/styles/layout.scss'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Holidaze - Find Your Perfect Venue',
  description: 'Find the perfect venue for your event',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${outfit.variable} ${inter.variable} d-flex flex-column min-vh-100 bg-light`}
      >
        <NavBar />
        <main className='mainLayout container flex-grow-1  '>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
