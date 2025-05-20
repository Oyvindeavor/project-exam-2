import Link from 'next/link'
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'
import { Suspense } from 'react'
import AvatarSkeleton from '@/components/Avatar/AvatarSkeleton'
import AvatarWrapper from '@/components/Avatar/AvatarWrapper'
import HamburgerMenuWrapper from '@/components/HamburgerMenu/HamburgerMenuWrapper'
import Logo from '@/components/Logo'
import { LogIn, UserPlus } from 'lucide-react'

export default async function NavBar() {
  const isLoggedIn = await isUserLoggedIn()

  return (
    <nav className='navbar navbar-expand-lg' aria-label='Main navigation'>
      <div className='container'>
        {/* Logo */}
        <Logo />
        <div className='d-lg-none'>
          <HamburgerMenuWrapper />
        </div>
        <div className='collapse navbar-collapse' id='navbarNav'>
          {/* Navigation Links List */}
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link href='/venues' className='nav-link text-light' aria-current='page'>
                Venues
              </Link>
            </li>
          </ul>

          {/* Avatar and Auth Links */}
          <div className='d-flex align-items-center'>
            {isLoggedIn ? (
              <Suspense fallback={<AvatarSkeleton />}>
                <AvatarWrapper />
              </Suspense>
            ) : (
              // Display Login/Signup if not logged in
              <>
                <Link href='/auth/login' className='btn btn-sm btn-outline-success text-light me-2'>
                  Login
                  <LogIn className='ms-1' size={16} aria-hidden='true' focusable='false' />
                </Link>
                <Link href='/auth/register' className='btn btn-sm btn-outline-warning text-light'>
                  Sign-up
                  <UserPlus className='ms-1' size={16} aria-hidden='true' focusable='false' />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
