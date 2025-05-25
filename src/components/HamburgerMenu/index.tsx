'use client'
import Link from 'next/link'
import { LogIn, UserPlus, User, Calendar, PlusSquare } from 'lucide-react'
import styles from './HamburgerMenu.module.scss'
import LogoutButton from '../LogoutButton'
import HamburgerToggle from './HamburgerToggle'
import Logo from '@/components/Logo'

interface HamburgerMenuProps {
  avatarUrl?: string
  isLoggedIn: boolean | null
  profileName?: string
  venueManager?: boolean
}

// Client-only offcanvas handler for link clicks
const handleLinkClick = () => {
  if (typeof window !== 'undefined') {
    const offcanvasEl = document.getElementById('offcanvasNavbar')
    if (offcanvasEl) {
      // Dynamically import Bootstrap's Offcanvas module
      import('bootstrap/js/dist/offcanvas')
        .then(({ default: Offcanvas }) => {
          const instance = Offcanvas.getInstance(offcanvasEl)
          if (instance) {
            instance.hide()
          }
        })
        .catch((err) => console.error('Failed to hide offcanvas after link click:', err))
    }
  }
}

export default function HamburgerMenu({
  avatarUrl,
  profileName,
  isLoggedIn,
  venueManager,
}: HamburgerMenuProps) {
  return (
    <div className={styles.menuContainer}>
      <HamburgerToggle />
      <div
        className={`${styles.offCanvasMenu} d-lg-none offcanvas offcanvas-end`}
        tabIndex={-1}
        id='offcanvasNavbar'
        aria-labelledby='offcanvasNavbarLabel'
        role='dialog'
      >
        <div className='offcanvas-header'>
          <h2 className='h5 offcanvas-title t' id='offcanvasNavbarLabel'>
            <Logo />
          </h2>
          <button
            type='button'
            className='btn-close btn-close-white'
            data-bs-dismiss='offcanvas'
            aria-label='Close menu'
          ></button>
        </div>

        <div className='offcanvas-body d-flex flex-column'>
          {/* Main navigation links */}
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link href='/venues' className='nav-link text-light' onClick={handleLinkClick}>
                Venues
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/about' className='nav-link text-light' onClick={handleLinkClick}>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/contact' className='nav-link text-light' onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
          </ul>

          <hr className='text-white' />

          {/* User-specific section (profile, auth links) */}
          <div className='d-flex flex-column justify-content-between flex-grow-1'>
            {isLoggedIn === null ? (
              <div className='placeholder-glow mt-2' aria-hidden='true'>
                <div className='placeholder rounded-circle bg-light'></div>
              </div>
            ) : isLoggedIn && avatarUrl ? (
              <div className='d-flex flex-column gap-3'>
                <div className='d-flex align-items-center gap-3'>
                  <img
                    src={avatarUrl}
                    alt={`${profileName || 'User'}'s avatar`}
                    className='rounded-circle border border-light'
                    width={40}
                    height={40}
                  />
                  <div className='text-light fw-semibold'>
                    {profileName
                      ? profileName.charAt(0).toUpperCase() + profileName.slice(1)
                      : 'User'}
                  </div>
                </div>

                <ul className='nav flex-column'>
                  <li className='nav-item'>
                    <Link href='/profile' className='nav-link text-light' onClick={handleLinkClick}>
                      <User size={18} className='me-2' aria-hidden='true' focusable='false' />
                      <span>Profile</span>
                    </Link>
                  </li>

                  {venueManager ? (
                    <>
                      <li className='nav-item'>
                        <Link
                          href='/profile/venues'
                          className='nav-link text-light'
                          onClick={handleLinkClick}
                        >
                          <User size={18} className='me-2' aria-hidden='true' focusable='false' />
                          <span>My Venues</span>
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link
                          href='/profile/create'
                          className='nav-link text-light'
                          onClick={handleLinkClick}
                        >
                          <PlusSquare
                            size={18}
                            className='me-2'
                            aria-hidden='true'
                            focusable='false'
                          />
                          <span>Create Venue</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className='nav-item'>
                      <Link
                        href='/profile/bookings'
                        className='nav-link text-light'
                        onClick={handleLinkClick}
                      >
                        <Calendar size={18} className='me-2' aria-hidden='true' focusable='false' />
                        <span>My Bookings</span>
                      </Link>
                    </li>
                  )}
                </ul>
                <LogoutButton className='btn btn-sm btn-outline-warning text-light' />
              </div>
            ) : (
              <div className='d-flex flex-column gap-2 mt-3'>
                <Link
                  href='/auth/login'
                  className='btn btn-outline-light d-flex align-items-center justify-content-center'
                  onClick={handleLinkClick}
                >
                  <LogIn className='me-2' size={18} aria-hidden='true' focusable='false' />
                  <span>Login</span>
                </Link>
                <Link
                  href='/auth/register'
                  className='btn btn-warning d-flex align-items-center justify-content-center'
                  onClick={handleLinkClick}
                >
                  <UserPlus className='me-2' size={18} aria-hidden='true' focusable='false' />
                  <span>Sign-up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
