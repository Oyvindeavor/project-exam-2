import Link from 'next/link'
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'
import isUserVenueManager from '@/utils/auth/isVenueManager'

interface BookNowProps {
  id: string
}

export default async function BookNow({ id }: BookNowProps) {
  const isLoggedIn = await isUserLoggedIn()
  const venueManager = await isUserVenueManager()

  return (
    <div className='card bg-primary text-white shadow-sm my-4 border-0 rounded-4'>
      <div className='card-body text-center py-5'>
        <h2 className='mb-4'>Ready to book this venue?</h2>

        {venueManager ? (
          <>
            <button className='btn btn-light btn-lg px-5 fw-semibold' disabled>
              Book now
            </button>
            <p className='mt-3 '>Venue managers can&apos;t book venues.</p>
          </>
        ) : (
          <Link
            href={isLoggedIn ? `/venue/${id}/book` : '/auth/login'}
            className='btn btn-light btn-lg px-5 fw-semibold'
          >
            {isLoggedIn ? 'Book Now' : 'Log in to Book'}
          </Link>
        )}
      </div>
    </div>
  )
}
