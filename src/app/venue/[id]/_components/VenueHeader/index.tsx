import { Star } from 'lucide-react'

interface VenueHeaderProps {
  name: string
  price: number
  maxGuests: number
  rating?: number
  description: string
}

export default function VenueHeader({
  name,
  price,
  maxGuests,
  rating,
  description,
}: VenueHeaderProps) {
  return (
    <div className='mb-4'>
      <h1 className='display-5 fw-semibold'>{name}</h1>

      <div className='d-flex flex-wrap align-items-center gap-2 mb-3'>
        <span className='badge bg-primary'>${price} / night</span>
        <span className='badge bg-secondary'>
          {maxGuests} guest{maxGuests !== 1 && 's'}
        </span>
        {typeof rating === 'number' && rating > 0 && (
          <span className='d-flex align-items-center text-warning'>
            <Star className='me-1' fill='currentColor' />
            <span className='text-dark'>{rating.toFixed(1)} / 5</span>
          </span>
        )}
      </div>

      <p className='lead text-muted'>{description}</p>
    </div>
  )
}
