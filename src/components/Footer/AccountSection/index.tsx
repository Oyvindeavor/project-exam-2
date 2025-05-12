import Link from 'next/link'
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'
import { CircleUserRound } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton'
import isUserVenueManager from '@/utils/auth/isVenueManager'

export default async function AccountSection() {
  const isLoggedIn = await isUserLoggedIn()
  const isVenueManager = isLoggedIn ? await isUserVenueManager() : false

  return (
    <div className='col mb-3'>
      <h2 className='text-light fw-bold d-flex align-items-center gap-2'>
        Account <CircleUserRound width={20} height={20} />
      </h2>
      <ul className='nav flex-column'>
        {isLoggedIn ? (
          <>
            <li className='nav-item mb-2'>
              <Link href='/profile' className='nav-link p-0 text-light'>
                Profile
              </Link>
            </li>

            {isVenueManager ? (
              <>
                <li className='nav-item mb-2'>
                  <Link href='/profile/venues' className='nav-link p-0 text-light'>
                    My Venues
                  </Link>
                </li>
                <li className='nav-item mb-2'>
                  <Link href='/profile/create' className='nav-link p-0 text-light'>
                    Create Venue
                  </Link>
                </li>
              </>
            ) : (
              <li className='nav-item mb-2'>
                <Link href='/profile/bookings' className='nav-link p-0 text-light'>
                  My Bookings
                </Link>
              </li>
            )}

            <li className='nav-item mb-2'>
              <LogoutButton className='nav-link p-0 text-light' />
            </li>
          </>
        ) : (
          <>
            <li className='nav-item mb-2'>
              <Link href='/auth/login' className='nav-link p-0 text-light'>
                Login
              </Link>
            </li>
            <li className='nav-item mb-2'>
              <Link href='/auth/register' className='nav-link p-0 text-light'>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
