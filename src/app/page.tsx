import VenueCard from '@/components/VenueCard'
import fetchAllVenues from '@/utils/api/venues/fetchAllVenues'

export default async function Home() {
  const { venues, meta } = await fetchAllVenues({
    sort: 'created',
    sortOrder: 'desc',
    limit: 20,
    page: 21,
    _owner: true,
    _bookings: true,
    revalidate: 60, // Cache for 60 seconds
  })

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
        {venues.data.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      <div className='d-flex justify-content-center mt-4'>
        <button className='btn btn-primary' disabled={meta.currentPage >= meta.nextPage}>
          Load More
        </button>
      </div>
    </div>
  )
}
