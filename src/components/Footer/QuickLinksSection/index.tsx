import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
export default function QuickLinkSection() {
  return (
    <div className='col mb-3'>
      <h2 className='text-light fw-bold h5 d-flex align-items-center gap-2'>
        Quick links <LinkIcon width={20} height={20} />
      </h2>
      <ul className='nav flex-column'>
        <li className='nav-item mb-2'>
          <Link href='/venues' className='nav-link p-0 text-light'>
            Venues
          </Link>
        </li>

        <li className='nav-item mb-2'>
          <Link href='/faq' className='nav-link p-0 text-light'>
            FAQ
          </Link>
        </li>
        <li className='nav-item mb-2'>
          <Link href='/about' className='nav-link p-0 text-light'>
            About
          </Link>
        </li>
      </ul>
    </div>
  )
}
