import CreateBookingForm from '@/components/Forms/CreateBookingForm'
import fetchVenueById from '@/utils/api/venues/fetchVenueById'
import { Metadata } from 'next'

interface Props {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: 'Book Venue - Holidaze',
  description: 'Book your stay at this venue.',
}

export default async function BookPage(props: Props) {
  const params = await props.params
  const { id } = params

  const { venue } = await fetchVenueById(id)

  return (
    <div className='container py-4'>
      <div className='row justify-content-center mb-4'>
        <div className='col-md-8'>
          <div className='card'>
            {venue?.media?.[0]?.url && (
              <div
                className='w-100'
                style={{
                  height: '300px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={venue.media[0].url}
                  alt={venue.name}
                  className='img-fluid w-100 h-100'
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <div className='card-body'>
              <h1 className='card-title'>{venue?.name}</h1>
              <p className='card-text'>
                {venue?.location?.city && (
                  <span className='d-block'>
                    <strong>Location:</strong> {venue.location.city}
                  </span>
                )}
                <span className='d-block'>
                  <strong>Max Guests:</strong> {venue?.maxGuests}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <CreateBookingForm venueId={id} venueName={venue?.name} maxGuests={venue?.maxGuests} />
        </div>
      </div>
    </div>
  )
}
