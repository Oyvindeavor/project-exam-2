import CreateBookingForm from '@/components/Forms/CreateBookingForm'

interface Props {
  params: Promise<{
    id: string
  }>
}
export default async function BookPage(props: Props) {
  const params = await props.params;
  const { id } = params

  return (
    <div className='container'>
      <div className='card'>
        <h1 className='mb-4'>Book Venue</h1>
        <p>Venue ID: {id}</p>

        <CreateBookingForm venueId={id} />
      </div>
    </div>
  )
}
