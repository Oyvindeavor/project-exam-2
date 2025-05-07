import { Star } from 'lucide-react'

interface VenueHeaderProps {
  name: string
  price: number
  maxGuests: number
  rating?: number // Optional
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
    <>
      <h1 className='display-5 fw-bold mb-3'>{name}</h1>
      <div className='d-flex align-items-center mb-3'>
        <span className='badge bg-primary me-2'>${price}/night</span>
        <span className='badge bg-secondary me-2'>{maxGuests} guests</span>
        {typeof rating === 'number' && rating > 0 && (
          <span className='text-dark'>
            <Star className='me-1' fill='gold' color='gold' />
            {rating} Star
          </span>
        )}
      </div>
      <p className='lead mb-4'>{description}</p>
    </>
  )
}
