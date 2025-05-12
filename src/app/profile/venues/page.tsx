import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import VenueManagerCard from '@/components/VenueManagerCard'

export default async function ProfileVenues() {
  const { profile } = await fetchLoggedInUser({ venues: true, bookings: true })

  return (
    <div className='container py-4'>
      <h1 className='mb-3'>My Venues</h1>
      <p className='text-muted'>Manage your venues here.</p>

      <div className='row g-4'>
        {profile?.venues?.map((venue) => (
          <div className='col-12 col-sm-12 col-md-5 col-lg-4' key={venue.id}>
            <VenueManagerCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  )
}
