import CreateVenueForm from '@/components/Forms/CreateVenueForm'

export default function CreatePage() {
  return (
    <div className='container p-4'>
      <h1 className='text-center h3'>Create a New Venue</h1>
      <p className='text-center'>Fill out the form below to create a new venue.</p>
      <CreateVenueForm />
    </div>
  )
}
