import fetchVenueById from '@/utils/api/venues/fetchVenueById'
import type { VenuesResponseSingle } from '@/types/NoroffApi/response/venuesResponse'
import CreateBookingForm from '@/components/CreateBookingForm'

export default async function VenuePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params
  let venueData: VenuesResponseSingle | null = null
  let fetchError: string | null = null

  console.log(`VenuePage: Fetching data for venue ID: ${id} using external function`)

  try {
    const { venue, meta } = await fetchVenueById(id, { _owner: true, _bookings: true })
    venueData = { data: venue, meta: meta }
    console.log(`VenuePage: Successfully fetched venue ${id}`)
  } catch (error) {
    console.error(`VenuePage: Failed to fetch venue ${id}:`, error)
    fetchError = error instanceof Error ? error.message : 'Failed to load venue data.'
  }

  if (fetchError) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-danger' role='alert'>
          <h2>Error Loading Venue</h2>
          <p>{fetchError}</p>
          <p>Could not load data for venue ID: {id}. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!venueData) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-warning' role='alert'>
          <h2>Venue Not Found</h2>
          <p>Could not find data for venue ID: {id}.</p>
        </div>
      </div>
    )
  }

  console.log(`VenuePage: Rendering form for venue ID: ${id}`)

  return (
    <div className='container mt-4'>
      {venueData.data.media.length > 0 && (
        <img
          src={venueData.data.media[0].url}
          alt={venueData.data.media[0].alt}
          className='img-fluid'
        />
      )}

      <h1>Name: {venueData.data.name}</h1>
      <h2>Description: {venueData.data.description}</h2>
      <h2>Price: {venueData.data.price}</h2>

      <h2>Id: {venueData.data.id}</h2>
      <h2>Max guests: {venueData.data.maxGuests}</h2>
      <h2>Rating: {venueData.data.rating}</h2>

      <div>
        <h2>Meta: {venueData.data.name}</h2>
        <p>Wifi: {venueData.data.meta.wifi ? 'Yes' : 'No'}</p>
        <p>Parking: {venueData.data.meta.parking ? 'Yes' : 'No'}</p>
        <p>Breakfast: {venueData.data.meta.breakfast ? 'Yes' : 'No'}</p>
        <p>Pets: {venueData.data.meta.pets ? 'Yes' : 'No'}</p>
      </div>

      <h2>Location:</h2>
      <p>Address: {venueData.data.location.address}</p>
      <p>City: {venueData.data.location.city}</p>
      <p>Zip: {venueData.data.location.zip}</p>
      <p>Country: {venueData.data.location.country}</p>
      <p>Continent: {venueData.data.location.continent}</p>
      <p>Lat: {venueData.data.location.lat}</p>
      <p>Lng: {venueData.data.location.lng}</p>

      <h2>Bookings</h2>
      {venueData.data.bookings && venueData.data.bookings.length > 0 ? (
        <>
          <p>Bookings id: {venueData.data.bookings[0].id}</p>
          <p>Booking by: {venueData.data.bookings[0].customer.name}</p>
          <p>From: {venueData.data.bookings[0].dateFrom}</p>
          <p>To: {venueData.data.bookings[0].dateTo}</p>
        </>
      ) : (
        <p>No bookings available</p>
      )}

      <CreateBookingForm venueId={venueData.data.id} />
    </div>
  )
}
