import React from 'react'
import { cookies } from 'next/headers'
import UpdateVenueForm from '@/components/Forms/UpdateVenueForm'
import fetchVenueById from '@/utils/api/venues/fetchVenueById'
import type { VenuesResponseSingle } from '@/types/NoroffApi/response/venuesResponse'

interface EditVenuePageProps {
  params: Promise<{
    id: string
  }>
}

function parseJwt(token: string) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    return payload
  } catch {
    return null
  }
}

export default async function EditVenuePage(props: EditVenuePageProps) {
  const params = await props.params
  const { id } = params
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-danger'>
          <h2>Unauthorized</h2>
          <p>You must be logged in to access this page.</p>
        </div>
      </div>
    )
  }

  const user = parseJwt(token)
  if (!user?.email) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-danger'>
          <h2>Invalid Token</h2>
          <p>Unable to verify your identity. Please log in again.</p>
        </div>
      </div>
    )
  }

  let venueData: VenuesResponseSingle['data'] | null = null
  let fetchError: string | null = null

  try {
    const { venue } = await fetchVenueById(id, { token, _owner: true })

    if (venue?.owner?.email !== user.email) {
      return (
        <div className='container mt-5'>
          <div className='alert alert-danger'>
            <h2>Access Denied</h2>
            <p>You do not have permission to edit this venue.</p>
          </div>
        </div>
      )
    }

    venueData = venue ?? null
  } catch (error) {
    fetchError = error instanceof Error ? error.message : 'Failed to load venue data.'
  }

  if (fetchError) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-danger' role='alert'>
          <h2>Error Loading Venue</h2>
          <p>{fetchError}</p>
        </div>
      </div>
    )
  }

  if (!venueData) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-warning'>
          <h2>Venue Not Found</h2>
          <p>No venue found for ID: {id}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mt-4'>
      <UpdateVenueForm venue={venueData} />
    </div>
  )
}
