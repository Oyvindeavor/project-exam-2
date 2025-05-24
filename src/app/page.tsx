import HeroSearch from '@/components/Hero/HomePageHero'
import FiveStarVenues from '@/components/FiveStarVenuesSection'
import WeddingSection from '@/components/WeddingSection'
import UnusualSection from '@/components/UnusualSection'
import FeaturesSection from '@/components/FeaturesSection'
import AboutSection from '@/components/AboutSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - Holidaze',
  description: 'Discover amazing venues and experiences on Holidaze.',
}

export default async function Home() {
  return (
    <>
      <section aria-label='Hero Search and Site Introduction'>
        <HeroSearch />
      </section>
      <section aria-label='Features Section'>
        <FeaturesSection />
      </section>
      <hr className='mt-5 mb-4' />
      <section aria-label='Five Star Venues'>
        <FiveStarVenues />
      </section>
      <hr />
      <section aria-label='Wedding Venues'>
        <WeddingSection />
      </section>
      <hr />
      <section aria-label='Unusual Venues'>
        <UnusualSection />
      </section>
      <hr />
      <section aria-label='About Us'>
        <AboutSection />
      </section>
    </>
  )
}
