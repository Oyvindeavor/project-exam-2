'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { deleteVenueFormAction } from './deleteVenueFormAction'

type ActionState = {
  error?: string
  className?: string
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type='submit' className='dropdown-item' disabled={pending}>
      {pending ? 'Deleting...' : 'Delete Venue'}
    </button>
  )
}

export default function DeleteVenueButton({ id }: { id: string }) {
  const deleteWithId = async (): Promise<ActionState> => {
    return deleteVenueFormAction(id)
  }

  const [state, formAction] = useActionState(deleteWithId, { error: undefined })

  return (
    <form action={formAction}>
      <div className=''>
        <SubmitButton />
      </div>
      {state?.error && <div className='text-danger mt-2'>{state.error}</div>}
    </form>
  )
}
