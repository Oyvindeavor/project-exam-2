import Link from 'next/link'
import styles from './UnusualSection.module.scss'

export default function UnusualSection() {
  const imageAltText =
    'A grand, historic castle with lush green surroundings, exemplifying an unusual venue type'
  const imageUrl =
    'https://img.freepik.com/free-photo/lush-landscape-inveraray-castle-argyll-scotland_493961-354.jpg?uid=R196918893&ga=GA1.1.1860385760.1730962467&semt=ais_hybrid&w=740'

  return (
    <section
      className={`${styles.unusualSection} py-5 px-3 rounded-4`}
      aria-labelledby='unusual-section-heading'
    >
      <div className='container text-center'>
        <h2
          id='unusual-section-heading'
          className='section-title fw-bold mb-3 d-flex justify-content-center align-items-center gap-2'
        >
          To the Unusual
        </h2>
        <p className='lead mb-4 text-muted'>
          Whether it’s a birthday, corporate event, baby shower, or concert — we’ve got you covered
          with a wide variety of venues… even castles.
        </p>

        <img
          src={imageUrl}
          alt={imageAltText}
          className={`${styles.imguSection} img-fluid rounded-4 shadow mb-4`}
        />

        <div className='mt-4'>
          <Link href='/venues' className='btn btn-outline-primary px-4 py-2 fw-bold'>
            Browse All Venues
          </Link>
        </div>
      </div>
    </section>
  )
}
