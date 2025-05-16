import Link from 'next/link'
import styles from './UnusualSection.module.scss'

export default function UnusualSection() {
  const imageAltText =
    'A grand, historic castle with lush green surroundings, exemplifying an unusual venue type'
  return (
    <section className='text-center py-5' aria-labelledby='unusual-section-heading'>
      <div className='container'>
        <h2 id='unusual-section-heading' className='fw-bold mb-4'>
          To the unusual
        </h2>
        <p className='mb-4'>
          Whether it&apos;s a birthday, corporate event, baby shower, or concert — we&apos;ve got
          you covered with a wide variety of venues even unusual ones. Yes, even castles.
        </p>
        <img
          src='https://img.freepik.com/free-photo/lush-landscape-inveraray-castle-argyll-scotland_493961-354.jpg?uid=R196918893&ga=GA1.1.1860385760.1730962467&semt=ais_hybrid&w=740' // Consider hosting this image locally in your public folder for better control and performance.
          alt={imageAltText}
          className={`${styles.imguSection} img-fluid rounded shadow`}
        />
        <div className='mt-4'>
          <Link href='/venues' className='btn btn-warning btn-lg'>
            Browse All Venues
          </Link>
        </div>
      </div>
    </section>
  )
}
