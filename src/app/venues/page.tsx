import React, { Suspense } from 'react'
import VenueListServer from '@/components/VenuesList'
import VenueGridSkeleton from '@/components/VenugeGridSkeleton'

interface VenuesPageProps {
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

export default function VenuesPage({ searchParams }: VenuesPageProps) {
  return (
    <div className='container mt-4'>
      <div className='mb-4'>
        <p className='text-muted small'>Search, Sort, Filter controls will go here.</p>
      </div>

      <Suspense fallback={<VenueGridSkeleton />}>
        <VenueListServer searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
