import React from 'react'
import UpdateVenueForm from '@/components/UpdateVenueForm'

import fetchVenueById from '@/utils/api/venues/fetchVenueById'
import type { VenuesResponseSingle } from '@/types/NoroffApi/response/venuesResponse'

interface EditVenuePageProps {
  params: {
    id: string
  }
}

export default async function EditVenuePage({ params }: EditVenuePageProps) {
  const { id } = params
  let venueData: VenuesResponseSingle['data'] | null = null
  let fetchError: string | null = null

  console.log(`EditVenuePage: Fetching data for venue ID: ${id} using external function`)

  try {
    const { venue } = await fetchVenueById(id, { _owner: true })
    venueData = venue
    console.log(`EditVenuePage: Successfully fetched venue ${id}`)
  } catch (error) {
    console.error(`EditVenuePage: Failed to fetch venue ${id}:`, error)
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

  console.log(`EditVenuePage: Rendering form for venue ID: ${id}`)

  return (
    <div className='container mt-4'>
      <UpdateVenueForm venue={venueData} />
    </div>
  )
}
