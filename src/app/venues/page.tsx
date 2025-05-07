import React, { Suspense } from 'react'
import VenueListServer from '@/components/VenuesList'
import VenueGridSkeleton from '@/components/VenugeGridSkeleton'
import HeroSection from '@/components/SearchSortFilter'

// Data fetching is handled in api/venues/route.ts

interface SearchParams {
  q?: string
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: string
  page?: string
  _owner?: string
  _bookings?: string
}

interface VenuesPageProps {
  searchParams: Promise<SearchParams>
}

export default async function VenuesPage(props: VenuesPageProps) {
  const searchParams = await props.searchParams;
  // Extract the current search query from searchParams
  const currentQuery = searchParams.q?.trim() || ''

  return (
    <main className='container my-4'>
      <Suspense fallback={<VenueGridSkeleton />}>
        <HeroSection />
      </Suspense>
      {currentQuery && (
        <h2 className='h4 fw-normal mb-4 mt-5'>
          Showing results for: <span className='fw-semibold'>&quot;{currentQuery}&quot;</span>
        </h2>
      )}

      {!currentQuery && <h2 className='h4 fw-normal mb-4 mt-5'>All Venues</h2>}
      <Suspense fallback={<VenueGridSkeleton />}>
        <VenueListServer searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
