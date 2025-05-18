// app/loading.tsx
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
      <div className='text-center'>
        <div
          className='spinner-border text-primary'
          role='status'
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
        <p className='mt-3 text-muted'>Please wait...</p>
      </div>
    </div>
  )
}

export default Loading
