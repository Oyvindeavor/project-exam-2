'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Avatar.module.scss'
import AvatarSkeleton from './AvatarSkeleton'
import LogoutButton from '@/components/LogoutButton'

interface AvatarProps {
  avatarUrl: string
  altText?: string
  venueManager?: boolean
}

export default function Avatar({ avatarUrl, altText = 'User avatar', venueManager }: AvatarProps) {
  const [isBootstrapReady, setIsBootstrapReady] = useState(false)

  useEffect(() => {
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
        if (isMounted) setIsBootstrapReady(true)
      })
    return () => {
      isMounted = false
    }
  }, [])

  if (!isBootstrapReady) {
    return <AvatarSkeleton />
  }

  return (
    <div className={`dropdown`}>
      <button
        className={`btn p-0 border-0 rounded-circle ${styles.avatarButton}`}
        type='button'
        id='dropdownUserMenu'
        data-bs-toggle='dropdown'
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
      {/* Dropdown menu */}
      <ul
        className='dropdown-menu dropdown-menu-end text-small shadow-sm'
        aria-labelledby='dropdownUserMenu'
      >
        <li>
          <Link className='dropdown-item' href='/profile'>
            Profile
          </Link>
        </li>

        {venueManager ? (
          <>
            <li>
              <Link className='dropdown-item' href='/profile/venues'>
                My Venues
              </Link>
            </li>
            <li>
              <Link className='dropdown-item' href='/profile/create'>
                Create Venue
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link className='dropdown-item' href='/profile/bookings'>
              My Bookings
            </Link>
          </li>
        )}
        <li>
          <hr className='dropdown-divider my-1' />
          <a>
            {/* <a> is intentionally used here since next link wont "reload when navigating" */}
            <LogoutButton className='dropdown-item' />
          </a>
        </li>
      </ul>
    </div>
  )
}
