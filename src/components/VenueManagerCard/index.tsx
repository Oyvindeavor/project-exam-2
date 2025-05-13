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
    <div className='card h-100 shadow-sm'>
      <img src={imageUrl} alt={imageAlt} className='card-img-top' />

      <div className='card-body d-flex flex-column'>
        <h5 className='card-title text-primary mb-1'>{venue.name}</h5>
        <div className='card-text text-muted small mb-3'>
          {venue.location?.address && (
            <p className='mb-1'>
              {venue.location.address}
              {venue.location.city ? `, ${venue.location.city}` : ''}
            </p>
          )}
          <p className='mb-0'>Max {venue.maxGuests} guests</p>
        </div>

        <div className='mt-auto d-flex justify-content-between align-items-center'>
          <Link href={`/venue/${venue.id}`} className='btn btn-primary btn-sm w-100 me-2'>
            View
          </Link>

          <div className='dropdown'>
            <button
              className='btn btn-sm btn-outline-secondary dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Actions
            </button>
            <ul className='dropdown-menu dropdown-menu-end'>
              <li>
                <Link className='dropdown-item' href={`/profile/venues/edit/${venue.id}`}>
                  Edit
                </Link>
              </li>
              <li>
                <DeleteVenueButton id={venue.id} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
