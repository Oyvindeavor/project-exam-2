import Link from 'next/link'
import { Key } from 'lucide-react'
import SocialSection from './SocialSection'
import AccountSection from './AccountSection'
import QuickLinkSection from './QuickLinksSection'

export default function Footer() {
  return (
    <footer className='bg-dark text-light py-5 mt-auto border-top'>
      <div className='container'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-5'>
          <div className='col mb-3'>
            <Link
              href='/'
              className='d-flex align-items-center mb-3 text-light text-decoration-none'
              aria-label='Logo'
            >
              <Key className='me-2' width={32} height={32} />
              <span className='fs-5'>Holidaze</span>
            </Link>
            <p className='text-light'>© 2025 Company, Inc</p>
          </div>

          <div className='col mb-3' />
          <QuickLinkSection />
          <AccountSection />
          <SocialSection />
        </div>
      </div>
    </footer>
  )
}
