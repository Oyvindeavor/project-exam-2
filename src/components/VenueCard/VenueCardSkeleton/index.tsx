export default function VenueCardSkeleton() {
  return (
    <div className='col'>
      <div className={`card shadow-sm border-0 h-100 position-relative overflow-hidden `}>
        <div className='ratio ratio-4x3 bg-light placeholder-glow'>
          <div className='placeholder w-100 h-100' />
        </div>

        <div className='card-body d-flex flex-column'>
          <h5 className='card-title placeholder-glow'>
            <span className='placeholder col-6 bg-light' />
          </h5>

          <p className='card-text placeholder-glow'>
            <span className='placeholder col-9' />
            <span className='placeholder col-5' />
          </p>

          <div className='d-flex justify-content-between align-items-center mb-2 placeholder-glow'>
            <span className='placeholder col-2' />
            <span className='placeholder col-3' />
          </div>

          <div className='mb-3 placeholder-glow'>
            <span className='placeholder col-4 me-2' />
            <span className='placeholder col-3' />
          </div>

          <div className='mt-auto d-flex justify-content-end placeholder-glow'>
            <span className='placeholder col-2' />
          </div>
        </div>
      </div>
    </div>
  )
}
