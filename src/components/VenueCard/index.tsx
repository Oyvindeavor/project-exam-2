import Link from 'next/link'
import style from './VenueCard.module.scss'
import { Star, MapPin } from 'lucide-react'
import Amenities from '../Amenities'
import type { Venues } from '@/types/NoroffApi/venueTypes'
import LazyVenueImage from './LazyVenueImage'

interface VenueCardProps {
  venue: Venues
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link href={`/venue/${venue.id}`} className='text-decoration-none'>
      <div
        className={`${style.card} card border-2 h-100 position-relative overflow-hidden bg-white`}
      >
        {venue.media.length > 0 ? (
          <div className='ratio ratio-16x9 position-relative'>
            <LazyVenueImage
              src={venue.media[0].url}
              className='card-img-top object-fit-cover'
              alt={`${venue.media[0].alt} venue image of ${venue.name}` || `photo of ${venue.name}`} // Added extra alt text to prevent empty or short alt text
            />
            <div className={`${style.cardOverlay} position-absolute top-0 end-0 p-3`}>
              <span className='badge bg-white text-primary rounded-pill shadow-sm'>
                ${venue?.price}
                <span className='text-muted'>/night</span>
              </span>
            </div>
          </div>
        ) : (
          <div className=' bg-light ratio ratio-16x9 text-muted d-flex justify-content-center align-items-center'>
            No Image Available
          </div>
        )}
        <div className='card-body p-4'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h3 className='card-title h5  mb-0 text-truncate'>{venue?.name}</h3>
            <div className='d-flex align-items-center'>
              <Star size={16} fill='gold' color='gold' className='me-1' />
              <span className='fw-medium'>{venue.rating}</span>
            </div>
          </div>

          <div className='d-flex align-items-center text-muted small mb-3'>
            <MapPin size={14} className='me-1' />
            <span>{venue?.location?.city || 'Location not specified'}</span>
          </div>

          <p className='card-text text-muted small mb-3 text-truncate'>{venue?.description}</p>

          <Amenities amenities={venue.meta} />
        </div>
      </div>
    </Link>
  )
}
