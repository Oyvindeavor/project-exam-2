import { cookies } from 'next/headers'
import fetchVenuesByProfileName from '@/utils/api/profiles/fetchVenuesByProfileName'
import VenueManagerBookingsTable from '../_components/BookingsTable'
import RegularUserBookingCards from '../_components/RegularUserBookingsCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Bookings - Holidaze',
  description: 'Manage your bookings and venues.',
}

export default async function BookingsPage() {
  const cookieStore = await cookies()
  const venueManager = cookieStore.get('venueManager')?.value === 'true'
  const name = cookieStore.get('name')?.value

  if (!name) throw new Error('Missing user name')

  const { venues } = await fetchVenuesByProfileName(name, { bookings: true })

  if (venueManager) {
    return (
      <>
        <h1 className='visually-hidden'>My Bookings</h1>
        <VenueManagerBookingsTable venues={venues || []} />
      </>
    )
  }

  return (
    <>
      <h1 className='visually-hidden'>My Bookings</h1>
      <RegularUserBookingCards />
    </>
  )
}
