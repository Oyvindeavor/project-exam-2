import HeroSearch from '@/components/Hero/HomePageHero'
import FiveStarVenues from '@/components/FiveStarVenuesSection'
import WeddingSection from '@/components/WeddingSection'
import UnusualSection from '@/components/UnusualSection'

export default async function Home() {
  return (
    <div className='border-4 rounded-3 p-4'>
      <HeroSearch />
      <hr className='divider' />
      <FiveStarVenues />
      <hr className='divider' />

      <WeddingSection />

      <UnusualSection />
    </div>
  )
}
