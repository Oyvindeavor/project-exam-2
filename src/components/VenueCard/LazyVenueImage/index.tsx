'use client'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface Props {
  src: string
  alt?: string
  className?: string
  placeholderSrc?: string
  sizes?: string
}

const getSrcSet = (url: string) => {
  const separator = url.includes('?') ? '&' : '?'
  return `
    ${url}${separator}w=480 480w,
    ${url}${separator}w=768 768w,
    ${url}${separator}w=1024 1024w,
    ${url}${separator}w=1366 1366w,
    ${url}${separator}w=1920 1920w
  `.trim()
}

export default function LazyVenueImage({
  src,
  alt = 'Venue Image',
  className = '',
  placeholderSrc,
  sizes = '(max-width: 768px) 100vw, 33vw',
}: Props) {
  return (
    <LazyLoadImage
      src={`${src}${src.includes('?') ? '&' : '?'}w=1024`}
      alt={alt}
      effect='blur'
      className={`w-100 h-100 object-fit-cover d-block ${className}`}
      placeholderSrc={placeholderSrc}
      loading='lazy'
      sizes={sizes}
      srcSet={getSrcSet(src)}
    />
  )
}
