import { Star, Users } from 'lucide-react'

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
    <section className='mb-5' aria-labelledby='venue-heading'>
      <h1 id='venue-heading' className='display-4 fw-bold mb-4'>
        {name}
      </h1>

      <dl className='row gy-2 gx-5 align-items-center mb-4'>
        <div className='col-auto'>
          <dt className='text-muted small'>Price</dt>
          <dd className='d-flex align-items-center gap-2 fw-semibold fs-5 mb-0'>
            ${price} <span className='text-muted fs-6'>/ night</span>
          </dd>
        </div>

        <div className='col-auto'>
          <dt className='text-muted small'>Guests</dt>
          <dd className='d-flex align-items-center  gap-2 fw-semibold fs-5 mb-0'>
            <Users size={20} className='text-muted' />
            {maxGuests} guest{maxGuests !== 1 && 's'}
          </dd>
        </div>

        {typeof rating === 'number' && rating > 0 && (
          <div className='col-auto'>
            <dt className='text-muted small'>Rating</dt>
            <dd className='d-flex align-items-center gap-2 fw-semibold fs-5 mb-0'>
              <Star size={18} fill='gold' color='gold' />
              {rating.toFixed(1)}
            </dd>
          </div>
        )}
      </dl>

      <p className='lead text-muted'>{description}</p>
    </section>
  )
}
