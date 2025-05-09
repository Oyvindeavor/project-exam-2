import fetchVenueById from '@/utils/api/venues/fetchVenueById'
import Amenities from '@/components/Amenities'
import BookNow from '@/app/venue/[id]/_components/BookNow'
import Location from '@/app/venue/[id]/_components/Location'
import VenueImageGallery from '@/app/venue/[id]/_components/VenueImageGallery'
import VenueHostProfile from '@/app/venue/[id]/_components/VenueHostProfile'
import VenueHeader from '@/app/venue/[id]/_components/VenueHeader'
import ErrorDisplay from '@/components/ErrorDisplay'
import NotFoundDisplay from '@/components/NotFoundDisplay'

interface VenuePageProps {
  params: Promise<{
    id: string
  }>
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
      <VenueImageGallery media={venue.media} venueName={venue.name} />
      <VenueHostProfile owner={venue.owner} />
      <div className='container mb-4'>
        <VenueHeader
          name={venue.name}
          price={venue.price}
          maxGuests={venue.maxGuests}
          rating={venue.rating}
          description={venue.description}
        />
        <div className='my-4'>
          <h2 className='h4 mb-3'>Amenities</h2>
          <Amenities amenities={venue.meta} />
        </div>
      </div>
      <div className='mb-5'>
        <Location location={venue.location} />
      </div>
      <BookNow />
    </div>
  )
}
