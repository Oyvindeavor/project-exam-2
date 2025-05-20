import HeroSearch from '@/components/Hero/HomePageHero'
import FiveStarVenues from '@/components/FiveStarVenuesSection'
import WeddingSection from '@/components/WeddingSection'
import UnusualSection from '@/components/UnusualSection'
import FeaturesSection from '@/components/FeaturesSection'
import AboutSection from '@/components/AboutSection'
import ContactUs from '@/components/ContactUs'
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
      <section aria-label='Five Star Venues'>
        <FiveStarVenues />
      </section>
      <section aria-label='Wedding Venues'>
        <WeddingSection />
      </section>
      <section aria-label='Unusual Venues'>
        <UnusualSection />
      </section>
      <section aria-label='About Us'>
        <AboutSection />
      </section>
      <section aria-label='Contact Us'>
        <ContactUs />
      </section>
    </>
  )
}
