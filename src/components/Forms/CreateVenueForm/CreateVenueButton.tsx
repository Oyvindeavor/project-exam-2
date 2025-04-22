'use client'

import { useFormStatus } from 'react-dom'

export function CreateVenueButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' className='btn btn-primary w-100' disabled={pending}>
      {pending ? 'Creating Venue...' : 'Create Venue'}
    </button>
  )
}
