import NavLink from '../NavLink'
import { PanelsTopLeft, BookA, Building2, PlusCircle } from 'lucide-react'
import isUserVenueManager from '@/utils/auth/isVenueManager'

export default async function NavigationTabs() {
  const venueManager = await isUserVenueManager()

  return (
    <ul className='nav nav-tabs mb-4' id='profileTabs'>
      <li className='nav-item'>
        <NavLink href='/profile' exact>
          <PanelsTopLeft />
          Overview
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink href='/profile/bookings'>
          <BookA />
          {venueManager ? 'Bookings' : 'My Bookings'}
        </NavLink>
      </li>

      {venueManager && (
        <>
          <li className='nav-item'>
            <NavLink href='/profile/venues'>
              <Building2 />
              My Venues
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink href='/profile/create'>
              <PlusCircle />
              Create Venue
            </NavLink>
          </li>
        </>
      )}
    </ul>
  )
}
