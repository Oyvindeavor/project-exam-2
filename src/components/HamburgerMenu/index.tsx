'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { LogIn, UserPlus, User, Settings } from 'lucide-react'
import styles from './HamburgerMenu.module.scss'
import LogoutButton from '../LogoutButton'

interface HamburgerMenuProps {
  avatarUrl?: string
  isLoggedIn: boolean | null
  profileName?: string
}

export default function HamburgerMenu({ avatarUrl, profileName, isLoggedIn }: HamburgerMenuProps) {
  useEffect(() => {
    // Load Bootstrap Offcanvas JS
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
        className='offcanvas offcanvas-end '
        tabIndex={-1}
        id='offcanvasNavbar'
        aria-labelledby='offcanvasNavbarLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
            Menu
          </h5>
          <button
            type='button'
            className='btn-close btn-close-white'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>

        <div className='offcanvas-body'>
          <ul className='navbar-nav justify-content-end flex-grow-1 pe-3 mb-3 mb-lg-0'>
            <li className='nav-item'>
              <Link href='/venues' className='nav-link '>
                Venues
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/about' className='nav-link'>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/contact' className='nav-link'>
                Contact
              </Link>
            </li>
          </ul>

          <hr className='d-lg-none text-white-50' />

          <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center'>
            {isLoggedIn === null ? (
              <div
                className={`mt-2 mt-lg-0 ms-lg-auto ${styles.avatarSkeleton}`}
                aria-label='Loading user data'
              ></div>
            ) : isLoggedIn && avatarUrl ? (
              <div className={`mt-2 mt-lg-0 ms-lg-auto ${styles.userSection}`}>
                <div className={styles.avatarContainer}>
                  <img
                    src={avatarUrl}
                    alt='User Avatar'
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>
                      {profileName
                        ? profileName.charAt(0).toUpperCase() + profileName.slice(1)
                        : 'User'}
                    </p>
                  </div>
                </div>

                <div className={styles.userLinks}>
                  <Link href='/profile' className={`nav-link ${styles.userLink}`}>
                    <User size={18} /> Profile
                  </Link>
                  <Link href='/settings' className={`nav-link ${styles.userLink}`}>
                    <Settings size={18} /> Settings
                  </Link>
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <>
                <Link
                  href='/auth/login'
                  className={`btn btn-outline-light w-100 w-lg-auto mb-2 mb-lg-0 me-lg-2 d-flex align-items-center justify-content-center ${styles.authButton}`}
                >
                  <LogIn className='me-2' size={18} /> Login
                </Link>
                <Link
                  href='/auth/register'
                  className={`btn btn-warning w-100 w-lg-auto d-flex align-items-center justify-content-center ${styles.authButton}`}
                >
                  <UserPlus className='me-2' size={18} /> Sign-up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
