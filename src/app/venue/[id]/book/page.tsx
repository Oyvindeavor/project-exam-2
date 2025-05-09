import CreateBookingForm from '@/components/Forms/CreateBookingForm'
import fetchVenueById from '@/utils/api/venues/fetchVenueById'

interface Props {
  params: Promise<{
    id: string
  }>
}
export default async function BookPage(props: Props) {
  const params = await props.params
  const { id } = params

  // Fetch the venue by ID
  const { venue } = await fetchVenueById(id)

  return (
    <div className='container p-4'>
      <div className=''>
        <CreateBookingForm venueId={id} venueName={venue?.name} maxGuests={venue?.maxGuests} />
      </div>
    </div>
  )
}
