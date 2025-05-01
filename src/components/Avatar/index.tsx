// src/components/Avatar/index.tsx (or Avatar.tsx)
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Avatar.module.scss'
import AvatarSkeleton from './AvatarSkeleton' // Import Skeleton here
import LogoutButton from '../LogoutButton'

interface AvatarProps {
  avatarUrl: string
  altText?: string
}

export default function Avatar({ avatarUrl, altText = 'User avatar' }: AvatarProps) {
  // State to track if Bootstrap dropdown JS is ready *within this component*
  const [isBootstrapReady, setIsBootstrapReady] = useState(false)

  useEffect(() => {
    console.log('Avatar: useEffect - Importing Bootstrap JS...')
    let isMounted = true
    import('bootstrap/js/dist/dropdown')
      .then(() => {
        if (isMounted) {
          console.log('Avatar: Bootstrap JS loaded.')
          setIsBootstrapReady(true)
        }
      })
      .catch((error) => {
        console.error('Avatar: Failed to load Bootstrap JS:', error)
        if (isMounted) setIsBootstrapReady(true) // Decide error handling
      })
    return () => {
      isMounted = false
    }
  }, [])

  // --- Render Skeleton Internally if Bootstrap isn't ready ---
  if (!isBootstrapReady) {
    console.log('Avatar: Rendering Skeleton (Waiting for Bootstrap internally)')
    // This component renders its own skeleton initially
    return <AvatarSkeleton />
  }

  // --- Render the actual component structure once Bootstrap JS is loaded ---
  console.log('Avatar: Rendering full dropdown component.')
  return (
    <div className={`dropdown ${styles.avatarDropdown}`}>
      <button
        className={`btn p-0 border-0 rounded-circle dropdown-toggle ${styles.avatarButton}`}
        type='button'
        id='dropdownUserMenu'
        data-bs-toggle='dropdown' // This relies on Bootstrap JS
        aria-expanded='false'
        aria-label='User menu'
      >
        <img
          src={avatarUrl}
          alt={altText}
          className={`rounded-circle ${styles.avatarImage}`}
          width={40}
          height={40}
        />
      </button>
      {/* ... rest of the dropdown menu items ... */}
      <ul
        className='dropdown-menu dropdown-menu-end text-small shadow-sm'
        aria-labelledby='dropdownUserMenu'
      >
        <li>
          <Link className='dropdown-item' href='/profile'>
            Profile
          </Link>
        </li>
        <li>
          <hr className='dropdown-divider my-1' />
        </li>
        <li>
          <a>
            <LogoutButton />
          </a>
        </li>
      </ul>
    </div>
  )
}
