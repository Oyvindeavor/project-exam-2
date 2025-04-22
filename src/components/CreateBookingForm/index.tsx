'use client'

import { useActionState } from 'react'
import CreateBookingButton from './CreateBookingButton'
import createBookingFormAction from './action'

const initialState: { error?: string } = { error: undefined }

interface CreateBookingFormProps {
  venueId: string
}

export default function CreateBookingForm({ venueId }: CreateBookingFormProps) {
  const [state, formAction] = useActionState(createBookingFormAction, initialState)

  return (
    <form action={formAction} className='w-100' style={{ maxWidth: 400 }}>
      <h2 className='mb-4'>Create Booking</h2>

      {/* VENUE ID */}
      <input type='hidden' name='venueId' value={venueId} />

      <div className='mb-3'>
        <label htmlFor='dateFrom' className='form-label'>
          Date From
        </label>
        <input type='date' name='dateFrom' id='dateFrom' className='form-control' required />
      </div>

      <div className='mb-3'>
        <label htmlFor='dateTo' className='form-label'>
          Date To
        </label>
        <input type='date' name='dateTo' id='dateTo' className='form-control' required />
      </div>

      <div className='mb-3'>
        <label htmlFor='guests' className='form-label'>
          Guests
        </label>
        <input type='number' name='guests' id='guests' className='form-control' required />
      </div>

      {state?.error && <div className='alert alert-danger'>{state.error}</div>}

      <CreateBookingButton />
    </form>
  )
}

// function CreateBookingButton() {
//   const { pending } = useFormStatus()

//   return (
//     <button type='submit' className='btn btn-primary w-100' disabled={pending}>
//       {pending ? 'Creating Booking…' : 'Create Booking'}
//     </button>
//   )
// }
