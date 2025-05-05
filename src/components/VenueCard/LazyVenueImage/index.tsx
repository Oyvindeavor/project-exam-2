'use client'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface Props {
  src: string
  alt?: string
  className?: string
  placeholderSrc?: string
}

export default function LazyVenueImage({
  src,
  alt = 'Venue Image',
  className = '',
  placeholderSrc,
}: Props) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect='blur'
      className={`w-100 h-100 object-fit-cover d-block ${className}`}
      placeholderSrc={placeholderSrc}
      loading='lazy'
    />
  )
}
