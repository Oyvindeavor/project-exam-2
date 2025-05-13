'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { LogIn, UserPlus, User, Calendar, PlusSquare } from 'lucide-react'
import styles from './HamburgerMenu.module.scss'
import LogoutButton from '../LogoutButton'

interface HamburgerMenuProps {
  avatarUrl?: string
  isLoggedIn: boolean | null
  profileName?: string
  venueManager?: boolean
}

export default function HamburgerMenu({
  avatarUrl,
  profileName,
  isLoggedIn,
  venueManager,
}: HamburgerMenuProps) {
  useEffect(() => {
    import('bootstrap/js/dist/offcanvas').catch((err) =>
      console.error('Failed to load Bootstrap offcanvas JS:', err)
    )
  }, [])

  return (
    <div className={styles.menuContainer}>
      <button
        className={`navbar-toggler ${styles.hamburgerButton}`}
        type='button'
        data-bs-toggle='offcanvas'
        data-bs-target='#offcanvasNavbar'
        aria-controls='offcanvasNavbar'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div
        className='offcanvas bg-primary bg-gradient offcanvas-end'
        tabIndex={-1}
        id='offcanvasNavbar'
        aria-labelledby='offcanvasNavbarLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title text-light' id='offcanvasNavbarLabel'>
            Menu
          </h5>
          <button
            type='button'
            className='btn-close btn-close-white'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>

        <div className='offcanvas-body d-flex flex-column'>
          {/* Navigation Links */}
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link href='/venues' className='nav-link text-light'>
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

          <hr className='text-white' />

          {/* User Info or Auth Links */}
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
                    <Link href='/profile' className='nav-link text-light'>
                      <User size={18} className='me-2' /> Profile
                    </Link>
                  </li>

                  {venueManager ? (
                    <>
                      <li className='nav-item'>
                        <Link href='/profile/venues' className='nav-link text-light'>
                          <User size={18} className='me-2' /> My Venues
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link href='/profile/create' className='nav-link text-light'>
                          <PlusSquare size={18} className='me-2' /> Create Venue
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className='nav-item'>
                      <Link href='/profile/bookings' className='nav-link text-light'>
                        <Calendar size={18} className='me-2' /> My Bookings
                      </Link>
                    </li>
                  )}
                </ul>

                <LogoutButton className='btn btn-sm btn-outline-danger' />
              </div>
            ) : (
              <div className='d-flex flex-column gap-2 mt-3'>
                <Link
                  href='/auth/login'
                  className='btn btn-outline-light d-flex align-items-center justify-content-center'
                >
                  <LogIn className='me-2' size={18} /> Login
                </Link>
                <Link
                  href='/auth/register'
                  className='btn btn-warning d-flex align-items-center justify-content-center'
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
