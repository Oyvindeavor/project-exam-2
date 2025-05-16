import searchVenues from '@/utils/api/venues/searchVenues'
import Link from 'next/link'
import VenueCard from '@/components/VenueCard'
import type { Venues } from '@/types/NoroffApi/venueTypes'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

interface SearchResult {
  venues?: Venues[]
  error?: ApiErrorResponse
}

export default async function WeddingSection() {
  const result: SearchResult = await searchVenues('wedding', {
    sort: 'rating',
    sortOrder: 'asc',
    limit: 3,
    page: 1,
    revalidate: 60,
  })

  const { venues, error } = result

  if (error) {
    return (
      <section
        className='mt-4 bg bg-body-tertiary rounded-3 py-4'
        aria-labelledby='wedding-section-heading-error'
      >
        <div className='container text-center'>
          <h2 id='wedding-section-heading-error' className='mb-3'>
            Weddings
          </h2>
          <p role='alert' className='text-danger'>
            Could not load wedding venues at this time. Please try again later.
          </p>
        </div>
      </section>
    )
  }

  if (!venues || venues.length === 0) {
    return (
      <section
        className='mt-4 bg bg-body-tertiary rounded-3 py-4'
        aria-labelledby='wedding-section-heading-empty'
      >
        <div className='container text-center'>
          <h2 id='wedding-section-heading-empty' className='text-center mb-4'>
            Weddings
          </h2>
          <p className='text-center mb-4'>Planning a wedding?</p>
          <p>Currently, there are no wedding venues to display that match your criteria.</p>
          <Link href={'/venues/?q=wedding'} className='btn btn-outline-primary mt-4'>
            Explore More Wedding Venues
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section
      className='mt-4 bg bg-body-tertiary rounded-3'
      aria-labelledby='wedding-section-heading'
    >
      <h2 id='wedding-section-heading' className='text-center mb-4'>
        Weddings
      </h2>
      <p className='text-center mb-4'>Planning a wedding? Find the perfect venue with us.</p>
      <div className='container rounded-3'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-4'>
          {venues.map((venue: Venues) => (
            <div className='col' key={venue.id}>
              <VenueCard venue={venue} />
            </div>
          ))}
        </div>
        <Link href={'/venues/?q=wedding'} className='btn btn-outline-primary mt-4'>
          View more <span className='visually-hidden'>wedding venues</span>
        </Link>
      </div>
    </section>
  )
}
