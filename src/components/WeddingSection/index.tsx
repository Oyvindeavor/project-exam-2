import searchVenues from '@/utils/api/venues/searchVenues'
import Link from 'next/link'
import VenueCard from '@/components/VenueCard'

export default async function WeddingSection() {
  const { venues } = await searchVenues('wedding', {
    sort: 'rating',
    sortOrder: 'asc',
    limit: 3,
    page: 1,
    revalidate: 60, // Cache for 60 seconds
  })

  return (
    <section className='mt-4 bg bg-body-tertiary rounded-3'>
      <h2 className='text-center mb-4'>Weddings</h2>
      <p className='text-center mb-4'>Planning a wedding? </p>

      <div className='container rounded-3'>
        <div className='row row-cols-1 row-cols-sm-2 row-cold-md-3 row-cols-lg-3 row-cols-xl-3 g-4'>
          {venues.map((venue) => (
            <div className='col' key={venue.id}>
              <VenueCard venue={venue} />
            </div>
          ))}
        </div>
        <Link href={'/venues/?q=wedding'} className='btn btn-outline-primary mt-4'>
          View more
        </Link>
      </div>
    </section>
  )
}
