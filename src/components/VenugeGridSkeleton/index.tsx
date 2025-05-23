import React from 'react'

import VenueCardSkeleton from '@/components/VenueCard/VenueCardSkeleton'

interface VenueGridSkeletonProps {
  count?: number
}

export default function VenueGridSkeleton({ count = 12 }: VenueGridSkeletonProps) {
  return (
    <div className='row g-4' aria-busy='true' aria-live='polite'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='col-sm-6 col-md-5 col-lg-4'>
          <VenueCardSkeleton />
        </div>
      ))}
    </div>
  )
}
