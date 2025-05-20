import SocialSection from './SocialSection'
import AccountSection from './AccountSection'
import QuickLinkSection from './QuickLinksSection'
import Logo from '@/components/Logo'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={`${styles.footerC} py-5 border-top`}>
      <div className='container'>
        <div className='row row-cols-1 row-cols-sm-1  row-cols-md-4 row-cols-lg-5'>
          <div className='col mb-3'>
            <Logo />
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
