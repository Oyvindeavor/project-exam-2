import Link from 'next/link'
import style from './VenueCard.module.scss'
import { Star } from 'lucide-react'
import Amenities from '../Amenities'
import type { Venues } from '@/types/NoroffApi/venueTypes'

interface VenueCardProps {
  venue: Venues
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className='col'>
      <div
        className={`${style.card} card shadow-sm border-0 h-100 position-relative overflow-hidden`}
      >
        {venue.media.length > 0 ? (
          <div className='ratio ratio-4x3'>
            <img
              src={venue.media[0].url}
              className='card-img-top object-fit-cover'
              alt={venue.media[0].alt || 'Venue Image'}
              loading='lazy'
            />
          </div>
        ) : (
          <div className='bg-secondary ratio ratio-4x3 text-white d-flex justify-content-center align-items-center'>
            No Image Available
          </div>
        )}

        <div className='card-body'>
          <h5 className='card-title text-truncate fw-semibold'>{venue?.name}</h5>
          <p className='card-text text-truncate text-muted small'>{venue?.description}</p>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <span className='text-body-primary'>
              {venue.rating} <Star fill='gold' color='gold' />
            </span>
            <span className='text-muted small'>📍 {venue?.location?.city}</span>
          </div>

          <Amenities amenities={venue.meta} />

          <div className='d-flex justify-content-end'>
            <span className='fw-bold fs-5 text-primary'>${venue?.price}</span>
          </div>
        </div>

        <Link href={`/venue/${venue.id}`} className='stretched-link' />
      </div>
    </div>
  )
}
