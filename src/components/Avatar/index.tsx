'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Avatar.module.scss'
import AvatarSkeleton from './AvatarSkeleton'
import LogoutButton from '@/components/LogoutButton'
import { User, Home, PlusCircle, CalendarCheck } from 'lucide-react'

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
        if (isMounted) setIsBootstrapReady(true)
      })
      .catch(() => {
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
    <div className='dropdown'>
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

      <ul
        className='dropdown-menu dropdown-menu-end text-small shadow-sm py-2'
        aria-labelledby='dropdownUserMenu'
      >
        <li>
          <Link className='dropdown-item d-flex align-items-center gap-2' href='/profile'>
            <User size={16} />
            Profile
          </Link>
        </li>

        {venueManager ? (
          <>
            <li>
              <Link
                className='dropdown-item d-flex align-items-center gap-2'
                href='/profile/venues'
              >
                <Home size={16} />
                My Venues
              </Link>
            </li>
            <li>
              <Link
                className='dropdown-item d-flex align-items-center gap-2'
                href='/profile/create'
              >
                <PlusCircle size={16} />
                Create Venue
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              className='dropdown-item d-flex align-items-center gap-2'
              href='/profile/bookings'
            >
              <CalendarCheck size={16} />
              My Bookings
            </Link>
          </li>
        )}

        <li>
          <hr className='dropdown-divider my-2' />
        </li>

        <li>
          <a className='dropdown-item d-flex align-items-center gap-2'>
            <LogoutButton className='dropdown-item d-flex align-items-center gap-2' />
          </a>
        </li>
      </ul>
    </div>
  )
}
