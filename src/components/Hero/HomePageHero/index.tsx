import HeroInput from './HeroInput'
import styles from './HomePageHero.module.scss'

export default function HeroSearch() {
  return (
    <section
      className={`${styles.heroSection} rounded-3 shadow-lg container-fluid text-center`}
      aria-labelledby='hero-heading'
    >
      <div className={`container ${styles.contentContainer}`}>
        <div className='row py-lg-5'>
          <div className='col-lg-8 col-md-10 mx-auto'>
            <h1 id='hero-heading' className={styles.heading} tabIndex={-1}>
              Find your perfect venue today!
            </h1>
            <p className={styles.subtext}>
              Planning a wedding, corporate event, or a cozy gathering? we have the perfect space
              for you.
            </p>
            <div>
              <HeroInput />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
