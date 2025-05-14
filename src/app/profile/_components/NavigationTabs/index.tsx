import NavLink from '../NavLink'
import { PanelsTopLeft, BookA, Building2, PlusCircle } from 'lucide-react'
import isUserVenueManager from '@/utils/auth/isVenueManager'

export default async function NavigationTabs() {
  const venueManager = await isUserVenueManager()

  return (
    <ul className='nav nav-tabs nav-fill nav-item mb-4 gap-2' id='profileTabs'>
      <li className='nav-item'>
        <NavLink href='/profile' exact className='nav-link d-flex align-items-center gap-1'>
          <PanelsTopLeft size={18} />
          <span>Overview</span>
        </NavLink>
      </li>

      <li className='nav-item'>
        <NavLink href='/profile/bookings' className='nav-link d-flex align-items-center gap-1'>
          <BookA size={18} />
          <span>{venueManager ? 'Bookings' : 'My Bookings'}</span>
        </NavLink>
      </li>

      {venueManager && (
        <>
          <li className='nav-item'>
            <NavLink href='/profile/venues' className='nav-link d-flex align-items-center gap-1'>
              <Building2 size={18} />
              <span>My Venues</span>
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink href='/profile/create' className='nav-link d-flex align-items-center gap-1'>
              <PlusCircle size={18} />
              <span>Create Venue</span>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  )
}
