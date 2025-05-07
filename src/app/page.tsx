import VenueCard from '@/components/VenueCard'
import fetchAllVenues from '@/utils/api/venues/fetchAllVenues'
import HeroSearch from '@/components/Hero/HomePageHero'
import Divider from '@/components/Divider'

export default async function Home() {
  const { venues } = await fetchAllVenues({
    sort: 'created',
    sortOrder: 'desc',
    limit: 20,
    page: 21,
    _owner: true,
    _bookings: true,
    revalidate: 60, // Cache for 60 seconds
  })

  return (
    <div>
      <HeroSearch />
      <Divider />
      <div className='container mt-4'>
        <h2 className='text-center mb-4'>Featured Venues</h2>
        <p className='text-center mb-4'>
          Explore our curated selection of venues, perfect for any occasion.
        </p>
      </div>

      <div className='container'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
          {venues.data.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
        <Divider />
      </div>
    </div>
  )
}
