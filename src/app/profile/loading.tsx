export default function loading() {
  return (
    <div className='text-center'>
      <div
        className='spinner-grow text-primary text-center'
        style={{ width: '5rem', height: '5rem' }}
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}
