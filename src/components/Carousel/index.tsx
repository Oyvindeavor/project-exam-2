'use client'

import { useEffect, useId } from 'react'
import styles from './Carousel.module.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface CarouselProps {
  images: string[]
  alt: string[]
}

export default function Carousel({ images, alt }: CarouselProps) {
  // Generate a stable unique ID for the carousel
  const uniqueSuffix = useId()
  const carouselId = `venueCarousel-${uniqueSuffix}`

  useEffect(() => {
    // Import Bootstrap JS only on the client
    import('bootstrap/js/dist/carousel').catch((err) =>
      console.error('Failed to load Bootstrap carousel:', err)
    )
  }, [])

  if (!images || images.length === 0) {
    return <div className='alert alert-warning'>No images available for this venue.</div>
  }

  return (
    <div
      id={carouselId}
      className={`carousel carousel-dark slide`}
      data-bs-ride='carousel'
      aria-label='Venue images'
    >
      <div className='carousel-inner'>
        {images.map((imgSrc, index) => (
          <div key={imgSrc || index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <LazyLoadImage
              src={imgSrc}
              className={`d-block w-100 ${styles.carouselImage}`}
              alt={alt[index] || 'venue Image'}
              effect='blur'
              width='100%'
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className='carousel-control-prev'
            type='button'
            data-bs-target={`#${carouselId}`}
            data-bs-slide='prev'
          >
            <span className='carousel-control-prev-icon' aria-hidden='true'></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target={`#${carouselId}`}
            data-bs-slide='next'
          >
            <span className='carousel-control-next-icon' aria-hidden='true'></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className='carousel-indicators'>
          {images.map((_, index) => (
            <button
              key={index}
              type='button'
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  )
}
