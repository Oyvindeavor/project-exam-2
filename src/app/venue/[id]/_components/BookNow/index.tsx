import Link from 'next/link'
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'

interface BookNowProps {
  id: string
}

export default async function BookNow({ id }: BookNowProps) {
  const isLoggedIn = await isUserLoggedIn()

  return (
    <div className='card bg-primary text-white shadow-sm my-4 border-0 rounded-4'>
      <div className='card-body text-center py-5'>
        <h2 className='mb-4'>Ready to book this venue?</h2>
        <Link
          href={isLoggedIn ? `/venue/${id}/book` : '/auth/login'}
          className='btn btn-light btn-lg px-5 fw-semibold'
        >
          {isLoggedIn ? 'Book Now' : 'Log in to Book'}
        </Link>
      </div>
    </div>
  )
}
