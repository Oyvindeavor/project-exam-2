import fetchVenueById from '@/utils/api/venues/fetchVenueById'
import Amenities from '@/components/Amenities'
import BookNow from '@/app/venue/[id]/_components/BookNow'
import Location from '@/app/venue/[id]/_components/Location'
import VenueImageGallery from '@/app/venue/[id]/_components/VenueImageGallery'
import VenueHostProfile from '@/app/venue/[id]/_components/VenueHostProfile'
import VenueHeader from '@/app/venue/[id]/_components/VenueHeader'
import ErrorDisplay from '@/components/ErrorDisplay'
import NotFoundDisplay from '@/components/NotFoundDisplay'

export default async function VenuePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params

  const { venue, error } = await fetchVenueById(id, { _owner: true, _bookings: true })

  if (error) {
    return <ErrorDisplay title='Could not load venue' message={error} />
  }

  if (!venue) {
    return <NotFoundDisplay resourceName='venue' id={id} />
  }

  return (
    <div className='card container-fluid py-4'>
      {/* Venue Image Gallery */}
      <VenueImageGallery media={venue.media} venueName={venue.name} />

      {/* Toast Notifications */}

      {/* Host Info */}
      <VenueHostProfile owner={venue.owner} />

      {/* Venue Name Description */}
      <div className='container mb-4'>
        <VenueHeader
          name={venue.name}
          price={venue.price}
          maxGuests={venue.maxGuests}
          rating={venue.rating}
          description={venue.description}
        />

        {/* Amenities Section */}
        <div className='my-4'>
          <h2 className='h4 mb-3'>Amenities</h2>
          <Amenities amenities={venue.meta} />
        </div>
      </div>

      {/* Location */}
      <div className='mb-5'>
        <Location location={venue.location} />
      </div>

      {/* Booking Section */}
      <BookNow />
    </div>
  )
}
