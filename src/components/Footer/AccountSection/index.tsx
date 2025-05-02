import Link from 'next/link'
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'
import { CircleUserRound } from 'lucide-react'

export default async function AccountSection() {
  const isLoggedIn = await isUserLoggedIn()
  return (
    <div className='col mb-3'>
      <h5 className='text-light fw-bold  d-flex align-items-center gap-2'>
        Account <CircleUserRound width={20} height={20} />
      </h5>
      <ul className='nav flex-column'>
        {isLoggedIn && (
          <>
            <li className='nav-item mb-2'>
              <Link href='/profile' className='nav-link p-0 text-light'>
                Profile
              </Link>
            </li>
            <li className='nav-item mb-2'>
              <Link href='/logout' className='nav-link p-0 text-light'>
                Logout
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className='nav-item mb-2'>
              <Link href='/' className='nav-link p-0 text-light'>
                Login
              </Link>
            </li>
            <li className='nav-item mb-2'>
              <Link href='/features' className='nav-link p-0 text-light'>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
