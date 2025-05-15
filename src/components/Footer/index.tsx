import Link from 'next/link'
import SocialSection from './SocialSection'
import AccountSection from './AccountSection'
import QuickLinkSection from './QuickLinksSection'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={`${styles.footerC} py-5 border-top`}>
      <div className='container'>
        <div className='row row-cols-1 row-cols-sm-1  row-cols-md-4 row-cols-lg-5'>
          <div className='col mb-3'>
            <Link
              href='/'
              className='d-flex align-items-center mb-3 text-light text-decoration-none'
              aria-label='Logo'
              title='Logo'
              role='img'
            >
              <img src='/logo.svg' alt='Logo a stick drawn white arch with a doorway' />
            </Link>
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
