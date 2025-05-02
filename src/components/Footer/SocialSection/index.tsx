import Link from 'next/link'
import SimpleIcon from '@/components/SimpleIcon'
import { siFacebook, siInstagram, siX } from 'simple-icons'
import { Share2 } from 'lucide-react'
import style from './SocialSection.module.scss'

export default function SocialSection() {
  return (
    <div className='col mb-3'>
      <h5 className='text-light fw-bold  d-flex align-items-center gap-2'>
        Get in touch
        <Share2 size={20} width={20} />
      </h5>
      <ul className='nav flex-row'>
        <li className='nav-item m-1'>
          <Link
            href='https://www.facebook.com/'
            className={`${style.socialLogo} nav-link p-0 text-light`}
            target='_blank'
          >
            <span className='me-1'>
              <SimpleIcon icon={siFacebook} size={30} />
            </span>
          </Link>
        </li>
        <li className='nav-item m-1'>
          <Link
            href='https://www.instagram.com/'
            className={`${style.socialLogo} nav-link p-0 text-light`}
            target='_blank'
          >
            <span className='me-1'>
              <SimpleIcon icon={siInstagram} size={30} />
            </span>
          </Link>
        </li>
        <li className='nav-item m-1'>
          <Link
            href='https://x.com/'
            className={`${style.socialLogo} nav-link p-0 text-light`}
            target='_blank'
          >
            <span className='me-1'>
              <SimpleIcon icon={siX} size={30} />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
