'use client'

import { useEffect } from 'react'
import { MenuIcon } from 'lucide-react'
import styles from './HamburgerMenu.module.scss'

export default function HamburgerToggle() {
  useEffect(() => {
    const offcanvasPromise = import('bootstrap/js/dist/offcanvas')
    offcanvasPromise.catch((err) => console.error('Failed to load Bootstrap offcanvas JS:', err))

    const offcanvasElement = document.getElementById('offcanvasNavbar')
    if (offcanvasElement) {
      const handleShow = () => {} // empty function to prevent default behavior
      // This is a workaround to prevent the default behavior of Bootstrap's offcanvas
      const handleHide = () => {} // empty function to prevent default behavior

      offcanvasElement.addEventListener('show.bs.offcanvas', handleShow)
      offcanvasElement.addEventListener('hide.bs.offcanvas', handleHide)

      return () => {
        offcanvasElement.removeEventListener('show.bs.offcanvas', handleShow)
        offcanvasElement.removeEventListener('hide.bs.offcanvas', handleHide)
      }
    }
  }, [])

  return (
    <button
      className={`navbar-toggler ${styles.hamburgerButton}`}
      type='button'
      data-bs-toggle='offcanvas'
      data-bs-target='#offcanvasNavbar'
      aria-label='Toggle navigation menu'
    >
      <span className=''>
        <MenuIcon size={30} className={`text-light`} />
      </span>
    </button>
  )
}
