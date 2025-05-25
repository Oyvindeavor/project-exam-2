import fetchVenueById from '@/utils/api/venues/fetchVenueById'
import Amenities from '@/components/Amenities'
import BookNow from '@/app/venue/[id]/_components/BookNow'
import Location from '@/app/venue/[id]/_components/Location'
import VenueImageGallery from '@/app/venue/[id]/_components/VenueImageGallery'
import VenueHostProfile from '@/app/venue/[id]/_components/VenueHostProfile'
import VenueHeader from '@/app/venue/[id]/_components/VenueHeader'
import ErrorDisplay from '@/components/ErrorDisplay'
import NotFoundDisplay from '@/components/NotFoundDisplay'
import Calendar from '@/components/Calendar'
import { Metadata } from 'next'

interface VenuePageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: `Venue - Holidaze`,
  description: 'Explore the details of this venue.',
}

export default async function VenuePage(props: VenuePageProps) {
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
    <div className='container-fluid py-4'>
      {/* Image Gallery */}
      <div className='mb-4'>
        <VenueImageGallery media={venue.media} venueName={venue.name} />
      </div>

      {/* Host Profile */}
      <div className='container mb-4'>
        <VenueHostProfile owner={venue.owner} />
      </div>

      {/* Venue Info */}
      <div className='container mb-5'>
        <VenueHeader
          name={venue.name}
          price={venue.price}
          maxGuests={venue.maxGuests}
          rating={venue.rating}
          description={venue.description}
        />

        {/* Amenities */}
        <div className='my-4 border-top pt-4'>
          <h2 className='h5 mb-3'>Amenities</h2>
          <Amenities amenities={venue.meta} />
        </div>
      </div>

      {/* Location */}
      <div className='container mb-5'>
        <Location location={venue.location} />
      </div>
      {/* Availability Calendar */}
      <div className='container mb-5'>
        <h2 className='h5 mb-3'>Availability</h2>

        <div className='card shadow-sm'>
          <div className='card-body d-flex justify-content-center'>
            <Calendar bookings={venue.bookings ?? []} />
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className='container mb-5'>
        <BookNow id={id} />
      </div>
    </div>
  )
}
