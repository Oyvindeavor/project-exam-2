import type { Metadata } from 'next'
import { Outfit, Source_Sans_3 } from 'next/font/google'
import '@/styles/main.scss'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ScrollToTop from '@/components/ScrollToTop'
import '@/styles/layout.scss'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
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
      <body className={`${outfit.variable} ${sourceSans.variable} d-flex flex-column min-vh-100 `}>
        <NavBar />
        {/* <ScrollToTop /> */}
        <main className='mainLayout container flex-grow-1'>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}
