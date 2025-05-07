'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BookNow() {
  const pathname = usePathname()
  const bookPath = `${pathname}/book`

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card bg-primary text-white shadow'>
          <div className='card-body p-4 text-center'>
            <h3 className='mb-3'>Ready to book this venue?</h3>
            <Link href={bookPath} className='btn btn-light btn-lg px-4'>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
