import Link from 'next/link'
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'
import { Suspense } from 'react'
import AvatarSkeleton from '@/components/Avatar/AvatarSkeleton'
import AvatarWrapper from '@/components/Avatar/AvatarWrapper'
import HamburgerMenuWrapper from '@/components/HamburgerMenu/HamburgerMenuWrapper'
import { LogIn, UserPlus } from 'lucide-react'

export default async function NavBar() {
  const isLoggedIn = await isUserLoggedIn()

  return (
    <nav className='navbar  navbar-expand-lg '>
      <div className='container'>
        {/* Logo */}
        <Link href='/' className='navbar-brand '>
          <img
            src='/logo.svg'
            alt='Logo a stick drawn white arch with a doorway'
            className='logo'
            width={150}
            height={60}
          />
        </Link>

        {/* Hamburger Button */}
        <div className='d-lg-none'>
          <HamburgerMenuWrapper />
        </div>

        {/* Navbar */}
        <div className='collapse navbar-collapse' id='navbarNav'>
          {/* Navigation Links */}
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item  '>
              <Link href='/venues' className='nav-link text-light' aria-current='page'>
                Venues
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/about' className='nav-link text-light'>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/contact' className='nav-link text-light'>
                Contact
              </Link>
            </li>
          </ul>

          {/* Avatar */}
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
                  <LogIn className='ms-1' size={16} />
                </Link>
                <Link href='/auth/register' className='btn btn-sm btn-outline-warning text-light'>
                  Sign-up
                  <UserPlus className='ms-1' size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
