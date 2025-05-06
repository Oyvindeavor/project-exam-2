import React from 'react'
import { getVenuePageData } from '@/utils/getVenuePageData'

import VenueCard from '@/components/VenueCard'
import PaginationControls from './PaginationControls'

interface VenueListServerProps {
  searchParams: {
    q?: string
    sort?: string
    sortOrder?: 'asc' | 'desc'
    limit?: string
    page?: string
    _owner?: string
    _bookings?: string
  }
}

export default async function VenueListServer({ searchParams }: VenueListServerProps) {
  const { venuesData, metaData, error, query } = await getVenuePageData(searchParams)

  if (error) {
    return (
      <div className='alert alert-warning' role='alert'>
        <strong>Could not load venues:</strong> {error}
      </div>
    )
  }

  if (venuesData.length === 0) {
    return (
      <div className='alert alert-info' role='alert'>
        {query ? `No venues found matching "${query}".` : 'No venues found matching the criteria.'}
      </div>
    )
  }

  return (
    <>
      <div className='row g-4'>
        {venuesData.map((venue) => (
          <div key={venue.id} className='col-sm-6 col-md-4 col-lg-3'>
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>

      {/* Render Pagination using fetched metaData */}
      <PaginationControls metaData={metaData} searchParams={searchParams} />
    </>
  )
}
