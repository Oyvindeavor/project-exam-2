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
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-3'>
        {venuesData.map((venue) => (
          <div key={venue.id} className=''>
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
      <PaginationControls metaData={metaData} searchParams={searchParams} />
    </>
  )
}
