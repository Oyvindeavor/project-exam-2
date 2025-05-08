import VenueCard from '@/components/VenueCard'
import fetchAllVenues from '@/utils/api/venues/fetchAllVenues'
import HeroSearch from '@/components/Hero/HomePageHero'
import Divider from '@/components/Divider'

export default async function Home() {
  const { venues } = await fetchAllVenues({
    sort: 'created',
    sortOrder: 'desc',
    limit: 18,
    page: 1,
    _owner: true,
    _bookings: true,
    revalidate: 60, // Cache for 60 seconds
  })

  console.log('Venues:', venues)

  return (
    <div>
      <HeroSearch />
      <Divider />
      <div className='mt-4'>
        <h2 className='text-center mb-4'>Featured Venues</h2>
        <p className='text-center mb-4'>
          Explore our curated selection of venues, perfect for any occasion.
        </p>
      </div>
      <div className='container'>
        <div className='row row-cols-1 row-cols-sm-2 row-cold-md-3 row-cols-lg-3 row-cols-xl-3 g-4'>
          {venues.data.map((venue) => (
            <div className='col' key={venue.id}>
              <VenueCard venue={venue} />
            </div>
          ))}
        </div>
        <Divider />
      </div>
    </div>
  )
}
