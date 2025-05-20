import NavLink from '../NavLink'
import { PanelsTopLeft, BookA, Building2, PlusCircle } from 'lucide-react'
import isUserVenueManager from '@/utils/auth/isVenueManager'

export default async function NavigationTabs() {
  const venueManager = await isUserVenueManager()

  return (
    <div className='mb-4'>
      <ul className='nav nav-tabs justify-content-center flex-wrap gap-2 border-0' id='profileTabs'>
        <li className='nav-item'>
          <NavLink href='/profile' exact className='nav-link px-4 py-2 rounded nav-link-tab'>
            <PanelsTopLeft size={18} className='me-2' />
            <span>Overview</span>
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink href='/profile/bookings' className='nav-link px-4 py-2 rounded nav-link-tab'>
            <BookA size={18} className='me-2' />
            <span>{venueManager ? 'Bookings' : 'My Bookings'}</span>
          </NavLink>
        </li>

        {venueManager && (
          <>
            <li className='nav-item'>
              <NavLink href='/profile/venues' className='nav-link px-4 py-2 rounded nav-link-tab'>
                <Building2 size={18} className='me-2' />
                <span>My Venues</span>
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink href='/profile/create' className='nav-link px-4 py-2 rounded nav-link-tab'>
                <PlusCircle size={18} className='me-2' />
                <span>Create Venue</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
