import fetchAllVenues from '@/utils/api/venues/fetchAllVenues'
import Link from 'next/link'
import VenueCard from '@/components/VenueCard'
import type { VenuesResponse } from '@/types/NoroffApi/response/venuesResponse'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import { Star } from 'lucide-react'
import type { Venues } from '@/types/NoroffApi/venueTypes'

interface FetchResult {
  venues?: VenuesResponse
  error?: ApiErrorResponse
}

export default async function FiveStarVenues() {
  const result: FetchResult = await fetchAllVenues({
    sort: 'rating',
    sortOrder: 'desc',
    limit: 3,
    page: 1,
    _owner: true,
    _bookings: true,
    revalidate: 60,
  })

  const { venues, error } = result

  if (error) {
    return (
      <section
        className='mt-4 bg bg-body-tertiary rounded-3 py-4'
        aria-labelledby='five-star-venues-heading-error'
      >
        <div className='container text-center'>
          <h2 id='five-star-venues-heading-error' className='mb-3'>
            Five Star Venues
          </h2>
          <p role='alert' className='text-danger'>
            Could not load five-star venues at this time. Please try again later.
          </p>
        </div>
      </section>
    )
  }

  if (!venues || !venues.data || venues.data.length === 0) {
    return (
      <section
        className='mt-4 bg bg-body-tertiary rounded-3 py-4'
        aria-labelledby='five-star-venues-heading-empty'
      >
        <div className='container text-center'>
          <h2 id='five-star-venues-heading-empty' className='text-center mb-4'>
            Five Star Venues
          </h2>
          <p className='text-center mb-4'>Be a star for a day, book one of our 5 star venues.</p>
          <p>Currently, there are no five-star venues to display.</p>
          <Link href={'/venues'} className='btn btn-outline-primary mt-4'>
            Explore All Venues
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section
      className='five-star-section  px-3 rounded-4'
      aria-labelledby='five-star-venues-heading'
    >
      <div className='container'>
        <div className='text-center'>
          <h2
            id='five-star-venues-heading'
            className='section-title mb-3 d-flex justify-content-center align-items-center gap-2'
          >
            Five Star Venues
            <Star size={28} fill='gold' color='gold' />
          </h2>
          <p className='lead mb-5 text-muted'>
            Be a star for a day — book one of our luxury-rated venues.
          </p>
        </div>

        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
          {venues.data.map((venue: Venues) => (
            <div className='col' key={venue.id}>
              <VenueCard venue={venue} lazyLoad={false} />
            </div>
          ))}
        </div>

        <div className='mt-5 text-center'>
          <Link
            href='/venues/?sort=rating&sortOrder=desc'
            className='btn btn-outline-primary  text-dark px-4 py-2 fw-bold'
          >
            View More
            <span className='visually-hidden'> five star venues with high ratings</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
