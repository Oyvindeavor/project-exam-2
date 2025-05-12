import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import VenueManagerCard from '@/components/VenueManagerCard'
export default async function ProfileVenues() {
  const { profile } = await fetchLoggedInUser({ venues: true, bookings: true })
  return (
    <div className='container'>
      <h1>My Venues</h1>
      <p>Manage your venues here.</p>
      {profile?.venues?.map((venue) => <VenueManagerCard key={venue.id} venue={venue} />)}
    </div>
  )
}
