import fetchAllVenues from '@/utils/api/venues/fetchAllVenues'
import Link from 'next/link'
import VenueCard from '@/components/VenueCard'

export default async function FiveStarVenues() {
  const { venues } = await fetchAllVenues({
    sort: 'rating',
    sortOrder: 'desc',
    limit: 3,
    page: 1,
    _owner: true,
    _bookings: true,
    revalidate: 60, // Cache for 60 seconds
  })

  return (
    <section className='mt-4 bg bg-body-tertiary rounded-3 p-2'>
      <h2 className='text-center mb-4'>Five Star venues</h2>
      <p className='text-center mb-4'>Be a star for a day, book one of our 5 star venues.</p>

      <div className='container rounded-3 p-4'>
        <div className='row row-cols-1 row-cols-sm-2 row-cold-md-3 row-cols-lg-3 row-cols-xl-3 g-4'>
          {venues.data.map((venue) => (
            <div className='col' key={venue.id}>
              <VenueCard venue={venue} />
            </div>
          ))}
        </div>
        <Link href={'/venues/?sort=rating'} className='btn btn-outline-primary mt-4'>
          View more
        </Link>
      </div>
    </section>
  )
}
