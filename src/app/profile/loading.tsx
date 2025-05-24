export default function Loading() {
  return (
    <div className='text-center mt-5'>
      <div
        className='spinner-border text-primary'
        style={{ width: '5rem', height: '5rem' }}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}
