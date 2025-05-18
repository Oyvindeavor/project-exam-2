import HeroSearch from '@/components/Hero/HomePageHero'
import FiveStarVenues from '@/components/FiveStarVenuesSection'
import WeddingSection from '@/components/WeddingSection'
import UnusualSection from '@/components/UnusualSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - Holidaze',
  description: 'Discover amazing venues and experiences on Holidaze.',
}

export default async function Home() {
  return (
    <>
      <div className='border-4 rounded-3 p-4'>
        <section aria-label='Hero Search and Site Introduction'>
          <HeroSearch />
        </section>
        <hr className='divider' />
        <section aria-label='Five Star Venues'>
          <FiveStarVenues />
        </section>
        <hr className='divider' />
        <section aria-label='Wedding Venues'>
          <WeddingSection />
        </section>
        <section aria-label='Unusual Venues'>
          <UnusualSection />
        </section>
      </div>
    </>
  )
}
