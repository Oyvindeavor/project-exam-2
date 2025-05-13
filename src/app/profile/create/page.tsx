import CreateVenueForm from '@/components/Forms/CreateVenueForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Venue',
  description: 'Create a new venue to share with the world.',
}

export default function CreatePage() {
  return (
    <div className='container p-4'>
      <h1 className='text-center h3'>Create a New Venue</h1>
      <p className='text-center'>Fill out the form below to create a new venue.</p>
      <CreateVenueForm />
    </div>
  )
}
