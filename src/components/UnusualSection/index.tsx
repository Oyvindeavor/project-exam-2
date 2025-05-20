'use client'
import Link from 'next/link'
import styles from './UnusualSection.module.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function UnusualSection() {
  const imageAltText =
    'A grand, historic castle with foggy clouds, exemplifying an unusual venue type'
  const imageUrl =
    'https://plus.unsplash.com/premium_photo-1661873863027-51b409f112f5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60'

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

        <LazyLoadImage
          effect='blur'
          src={imageUrl}
          alt={imageAltText}
          className={`${styles.imguSection} img-fluid rounded-4 shadow mb-4`}
          loading='lazy'
          placeholderSrc='https://placehold.co/1200x450?text=Image+Loading'
        />

        <div className='mt-4'>
          <Link href='/venues' className='btn btn-outline-primary  text-dark px-4 py-2 fw-bold'>
            Browse All Venues
          </Link>
        </div>
      </div>
    </section>
  )
}
