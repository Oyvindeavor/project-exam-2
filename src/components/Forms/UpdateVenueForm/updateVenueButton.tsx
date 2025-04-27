'use client'

import { useFormStatus } from 'react-dom'

export function UpdateVenueButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' className='btn btn-primary w-100' disabled={pending}>
      {pending ? 'Updating Venue...' : 'Update Venye'}
    </button>
  )
}
