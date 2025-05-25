// app/loading.tsx
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='d-flex justify-content-center m-5  min-vh-100 bg-light'>
      <div className='text-center'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <p className='mt-3 text-muted'>Please wait...</p>
      </div>
    </div>
  )
}

export default Loading
