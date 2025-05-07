import Carousel from '@/components/Carousel'
import { Suspense } from 'react'

interface VenueImageGalleryProps {
  media: Array<{ url: string; alt?: string }> | undefined
  venueName: string
}

export default function VenueImageGallery({ media, venueName }: VenueImageGalleryProps) {
  return (
    <div className='row mb-2'>
      <div className='col-12'>
        <div className='card shadow overflow-hidden rounded-4'>
          <Suspense fallback={<div className='text-center p-5'>Loading images...</div>}>
            {media && media.length > 0 ? (
              <Carousel
                alt={media.map((image) => image.alt || `${venueName} image`)}
                images={media.map((image) => image.url)}
              />
            ) : (
              <div className='ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center'>
                <p className='text-muted'>No images available</p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
