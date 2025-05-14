import HeroInput from './HeroInput'
import styles from './HomePageHero.module.scss'

export default function HeroSearch() {
  return (
    <section className={`${styles.heroSection} container-fluid`} aria-labelledby='hero-heading'>
      <div className={`container ${styles.contentContainer}`}>
        <h1 id='hero-heading' className={styles.heading} tabIndex={-1}>
          Find your perfect venue today!
        </h1>
        <p className={styles.subtext}>
          Whether it’s a wedding, corporate event, or cozy celebration — we’ve got the perfect
          space.
        </p>
        <HeroInput />
      </div>
    </section>
  )
}
