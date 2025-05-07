import Link from 'next/link'
import HeroInput from './HeroInput'
import styles from './HomePageHero.module.scss'

export default function HeroSearch() {
  return (
    <section
      className={`${styles.heroSection} rounded-3 shadow-lg border container-fluid text-center`}
      aria-labelledby='hero-heading'
    >
      <div className={styles.overlay} aria-hidden='true'></div>
      <div className={`container ${styles.contentContainer}`}>
        <div className='row py-lg-5'>
          <div className='col-lg-8 col-md-10 mx-auto'>
            <h1 id='hero-heading' className={styles.heading} tabIndex={-1}>
              Find your perfect venue today!
            </h1>
            <p className={styles.subtext}>
              Discover a wide range of venues tailored to your needs. Whether you&apos;re planning a
              wedding, corporate event, or a cozy gathering, we have the perfect space for you.
            </p>
            <div className='mb-4'>
              <HeroInput />
            </div>
            <nav aria-label='Primary venue actions' className={styles.buttonGroup}>
              <Link
                href='/venues'
                className='btn btn-primary my-2 mx-2'
                role='button'
                aria-label='Browse all venues'
              >
                Browse venues
              </Link>
              <Link
                href='/register-venue'
                className='btn btn-secondary my-2 mx-2'
                role='button'
                aria-label='List your venue'
              >
                List your venue
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
