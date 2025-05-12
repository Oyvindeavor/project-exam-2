import Link from 'next/link'
import type { Venues } from '@/types/NoroffApi/venueTypes'
import DeleteVenueButton from '../DeleteVenueButton'

interface VenueManagerCardProps {
  venue: Venues
}

export default function VenueManagerCard({ venue }: VenueManagerCardProps) {
  const imageUrl = venue.media?.[0]?.url || '/default-venue-placeholder.jpg'
  const imageAlt = venue.media?.[0]?.alt || `Image of ${venue.name}`

  return (
    <div className='card  shadow-sm'>
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <img src={imageUrl} alt={imageAlt} className='card-img-top' />
      </div>
      <div className='card-body d-flex flex-column'>
        <h5 className='card-title text-primary'>{venue.name}</h5>
        <div className='card-text text-muted small mt-1 mb-3'>
          {venue.location?.address && (
            <p className='mb-1 d-flex align-items-center'>
              {venue.location.address}
              {venue.location.city ? `, ${venue.location.city}` : ''}
            </p>
          )}
          <p className='mb-0 d-flex align-items-center'>Max {venue.maxGuests} guests</p>
        </div>
      </div>
      <div className='card-footer bg-light border-top-0 pt-3'>
        <div className='d-grid gap-2 d-sm-flex justify-content-sm-between align-items-sm-center'>
          <Link href={`/venue/${venue.id}`} className='btn btn-primary btn-sm px-3'>
            View
          </Link>
          <div className='btn-group btn-group-sm' role='group' aria-label='Venue actions'>
            <Link
              href={`/profile/venues/edit/${venue.id}`}
              className='btn btn-group-sm btn-outline-secondary'
            >
              Edit
            </Link>
            <DeleteVenueButton id={venue.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
