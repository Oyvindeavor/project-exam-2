'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { deleteBookingFormAction } from './DeleteBookingFormAction'

type ActionState = {
  error?: string
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' className='btn btn-outline-danger text-dark' disabled={pending}>
      {pending ? 'Deleting...' : 'Delete Booking'}
    </button>
  )
}

export default function DeleteBookingButton({ bookingId }: { bookingId: string }) {
  const deleteWithId = async (): Promise<ActionState> => {
    return deleteBookingFormAction(bookingId)
  }

  const [state, formAction] = useActionState(deleteWithId, { error: undefined })

  return (
    <form action={formAction}>
      <div className=''>
        <SubmitButton />
      </div>
      {state?.error && <div className='text-dark mt-2'>{state.error}</div>}
    </form>
  )
}
