export default function VenueCardSkeleton() {
  return (
    <div className='col'>
      <div className='card border-2 h-100 position-relative overflow-hidden bg-white'>
        {/* Image Skeleton */}
        <div className='ratio ratio-16x9 position-relative bg-light placeholder-glow'>
          <div className='placeholder w-100 h-100' />

          {/* Price badge placeholder */}
          <div className='position-absolute top-0 end-0 p-3'>
            <span
              className='placeholder rounded-pill bg-white d-inline-block'
              style={{ width: '80px', height: '24px' }}
            />
          </div>
        </div>

        <div className='card-body p-4'>
          {/* Title & Rating */}
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <span className='placeholder col-6 h5 mb-0' />
            <div className='d-flex align-items-center'>
              <div
                className='placeholder rounded-circle me-1'
                style={{ width: '16px', height: '16px' }}
              />
              <span className='placeholder col-2' />
            </div>
          </div>

          {/* Location */}
          <div className='d-flex align-items-center text-muted small mb-3 placeholder-glow'>
            <div
              className='placeholder rounded-circle me-1'
              style={{ width: '14px', height: '14px' }}
            />
            <span className='placeholder col-4' />
          </div>

          {/* Description */}
          <p className='card-text text-muted small mb-3 placeholder-glow'>
            <span className='placeholder col-9' />
            <span className='placeholder col-5' />
          </p>

          {/* Amenities */}
          <div className='d-flex flex-wrap gap-2 placeholder-glow'>
            <span className='placeholder col-3' />
            <span className='placeholder col-2' />
            <span className='placeholder col-4' />
          </div>
        </div>
      </div>
    </div>
  )
}
