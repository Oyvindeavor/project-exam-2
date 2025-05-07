'use client'

import { useActionState } from 'react'
import CreateBookingButton from './CreateBookingButton'
import createBookingFormAction from './createBookingFormAction'
import DatePickerInput from '../../DatePickerInput/DatePickerInput'

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

      <DatePickerInput
        id='dateFrom'
        label='Date From'
        name='dateFrom'
        defaultValue={undefined}
        error={state?.error ? [state.error] : undefined}
        required
        venueId={venueId ?? ''}
      />

      <DatePickerInput
        id='dateTo'
        label='Date To'
        name='dateTo'
        defaultValue={undefined}
        error={state?.error ? [state.error] : undefined}
        required
        venueId={venueId ?? ''}
      />

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
