'use client'
import Link from 'next/link'
import { LogIn, UserPlus, User, Calendar, PlusSquare } from 'lucide-react'
import styles from './HamburgerMenu.module.scss'
import LogoutButton from '../LogoutButton'
import HamburgerToggle from './HamburgerToggle'

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
      import('bootstrap/js/dist/offcanvas')
        .then(({ default: Offcanvas }) => {
          Offcanvas.getOrCreateInstance(offcanvasEl).hide()
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
        className={`${styles.offCanvasMenu} offcanvas offcanvas-end`}
        tabIndex={-1}
        id='offcanvasNavbar'
        aria-labelledby='offcanvasNavbarLabel'
      >
        <div className='offcanvas-header'>
          <h2 className='h5 offcanvas-title text-light' id='offcanvasNavbarLabel'>
            Menu
          </h2>
          <button
            type='button'
            className='btn-close btn-close-white'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>

        <div className='offcanvas-body d-flex flex-column'>
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

          <div className='d-flex flex-column justify-content-between flex-grow-1'>
            {isLoggedIn === null ? (
              <div className='placeholder-glow mt-2'>
                <div
                  className='placeholder rounded-circle bg-light'
                  style={{ width: 40, height: 40 }}
                ></div>
              </div>
            ) : isLoggedIn && avatarUrl ? (
              <div className='d-flex flex-column gap-3'>
                <div className='d-flex align-items-center gap-3'>
                  <img
                    src={avatarUrl}
                    alt='User Avatar'
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
                      <User size={18} className='me-2' /> Profile
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
                          <User size={18} className='me-2' /> My Venues
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link
                          href='/profile/create'
                          className='nav-link text-light'
                          onClick={handleLinkClick}
                        >
                          <PlusSquare size={18} className='me-2' /> Create Venue
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
                        <Calendar size={18} className='me-2' /> My Bookings
                      </Link>
                    </li>
                  )}
                </ul>

                <LogoutButton className='btn btn-sm btn-outline-warning ' />
              </div>
            ) : (
              <div className='d-flex flex-column gap-2 mt-3'>
                <Link
                  href='/auth/login'
                  className='btn btn-outline-light d-flex align-items-center justify-content-center'
                  onClick={handleLinkClick}
                >
                  <LogIn className='me-2' size={18} /> Login
                </Link>
                <Link
                  href='/auth/register'
                  className='btn btn-warning d-flex align-items-center justify-content-center'
                  onClick={handleLinkClick}
                >
                  <UserPlus className='me-2' size={18} /> Sign-up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
