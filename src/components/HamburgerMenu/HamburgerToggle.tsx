'use client'

import { useEffect } from 'react'
import styles from './HamburgerMenu.module.scss'

export default function HamburgerToggle() {
  useEffect(() => {
    import('bootstrap/js/dist/offcanvas').catch((err) =>
      console.error('Failed to load Bootstrap offcanvas JS:', err)
    )
  }, [])

  return (
    <button
      className={`navbar-toggler ${styles.hamburgerButton}`}
      type='button'
      data-bs-toggle='offcanvas'
      data-bs-target='#offcanvasNavbar'
      id='offcanvasNavbarToggle'
      aria-label='Toggle navigation'
    >
      <span className='navbar-toggler-icon'></span>
    </button>
  )
}
