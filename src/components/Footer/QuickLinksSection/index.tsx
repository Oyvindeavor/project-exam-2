import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
export default function QuickLinkSection() {
  return (
    <div className='col mb-3'>
      <h5 className='text-light fw-bold  d-flex align-items-center gap-2'>
        Quick links <LinkIcon width={20} height={20} />
      </h5>
      <ul className='nav flex-column'>
        <li className='nav-item mb-2'>
          <Link href='/' className='nav-link p-0 text-light'>
            Home
          </Link>
        </li>
        <li className='nav-item mb-2'>
          <Link href='/venues' className='nav-link p-0 text-light'>
            Venues
          </Link>
        </li>

        <li className='nav-item mb-2'>
          <Link href='/faqs' className='nav-link p-0 text-light'>
            FAQs
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
