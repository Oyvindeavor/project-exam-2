'use client'

import React, { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { updateBookingAction, UpdateBookingFormState } from './updateBookingFormAction'
import type { BookingSingleResponse } from '@/types/NoroffApi/response/bookingsResponse'
import DatePickerInput from '../../DatePickerInput/DatePickerInput'

interface UpdateBookingFormProps {
  booking: BookingSingleResponse['data']
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type='submit' className='btn btn-primary w-100' disabled={pending}>
      {pending ? 'Updating Booking...' : 'Update Booking'}
    </button>
  )
}

export default function UpdateBookingForm({ booking }: UpdateBookingFormProps) {
  // Extracting id from the booking by venue
  const venueId = booking.venue?.id

  const initialState: UpdateBookingFormState = {
    message: '',
    errors: {},
    fieldValues: {
      dateFrom: booking.dateFrom ? new Date(booking.dateFrom).toISOString().split('T')[0] : '',
      dateTo: booking.dateTo ? new Date(booking.dateTo).toISOString().split('T')[0] : '',
      guests: booking.guests ?? undefined,
    },
    success: false,
  }

  const updateBookingActionWithId = (
    state: UpdateBookingFormState | undefined,
    formData: FormData
  ) => updateBookingAction(booking.id, state ?? initialState, formData)
  const [state, formAction] = useActionState(updateBookingActionWithId, initialState)

  useEffect(() => {
    console.log('Booking Form State Updated:', state)
    if (state?.message && !state?.success) {
      console.error('Form Error Message:', state.message)
    }
    if (state?.success) {
      console.log('Form Success Message:', state.message)
    }
  }, [state])

  const getDefaultValue = (fieldName: keyof NonNullable<UpdateBookingFormState['fieldValues']>) => {
    const stateValue = state?.fieldValues?.[fieldName] ?? ''
    if (stateValue !== undefined && stateValue !== null) {
      if ((fieldName === 'dateFrom' || fieldName === 'dateTo') && typeof stateValue === 'string') {
        try {
          return new Date(stateValue).toISOString().split('T')[0]
        } catch {
          return ''
        }
      }
      return stateValue
    }

    const bookingValue = booking[fieldName as keyof typeof booking]

    if ((fieldName === 'dateFrom' || fieldName === 'dateTo') && bookingValue) {
      try {
        return new Date(bookingValue as string | Date).toISOString().split('T')[0]
      } catch {
        return ''
      }
    }
    return bookingValue ?? ''
  }

  return (
    <form action={formAction} className='w-100 p-4 border rounded shadow-sm bg-light'>
      <h2 className='mb-4 text-center'>Update Booking</h2>
      {/* General API Error Display */}
      {state?.errors?.apiError && (
        <div className='alert alert-danger' role='alert'>
          {state.errors.apiError.join(', ')}
        </div>
      )}
      {/* General Message Display  */}
      {state?.message && !state.success && !state.errors?.apiError && (
        <div className='alert alert-danger' role='alert'>
          {state.message}
        </div>
      )}

      {state?.message && state.success && (
        <div className='alert alert-success' role='alert'>
          {state.message} (Redirecting...)
        </div>
      )}

      {/* Date From */}
      {/* <div className='mb-3'>
        <label htmlFor='dateFrom' className='form-label'>
          Check-in Date
        </label>
        <input
          type='date'
          name='dateFrom'
          id='dateFrom'
          className={`form-control ${state?.errors?.dateFrom ? 'is-invalid' : ''}`}
          defaultValue={getDefaultValue('dateFrom') as string}
          aria-describedby='dateFrom-error'
          required
        />
        {state?.errors?.dateFrom && (
          <div id='dateFrom-error' className='invalid-feedback'>
            {state?.errors.dateFrom.join(', ')}
          </div>
        )}
      </div> */}

      <DatePickerInput
        id='dateFrom'
        label='Check-in Date'
        name='dateFrom'
        defaultValue={getDefaultValue('dateFrom') as string}
        error={state?.errors?.dateFrom}
        required
        venueId={venueId ?? ''}
      />

      {/* Date To */}
      {/* <div className='mb-3'>
        <label htmlFor='dateTo' className='form-label'>
          Check-out Date
        </label>
        <input
          type='date'
          name='dateTo'
          id='dateTo'
          className={`form-control ${state?.errors?.dateTo ? 'is-invalid' : ''}`}
          defaultValue={getDefaultValue('dateTo') as string}
          aria-describedby='dateTo-error'
          required
        />
        {state?.errors?.dateTo && (
          <div id='dateTo-error' className='invalid-feedback'>
            {state?.errors.dateTo.join(', ')}
          </div>
        )}
      </div> */}
      <DatePickerInput
        id='dateTo'
        label='Check-out Date'
        name='dateTo'
        defaultValue={getDefaultValue('dateTo') as string}
        error={state?.errors?.dateTo}
        required
        venueId={venueId ?? ''}
      />

      {/* Guests */}
      <div className='mb-3'>
        <label htmlFor='guests' className='form-label'>
          Number of Guests
        </label>
        <input
          type='number'
          name='guests'
          id='guests'
          className={`form-control ${state?.errors?.guests ? 'is-invalid' : ''}`}
          defaultValue={getDefaultValue('guests') as number}
          aria-describedby='guests-error'
          required
          min='1'
          step='1'
        />
        {state?.errors?.guests && (
          <div id='guests-error' className='invalid-feedback'>
            {state.errors.guests.join(', ')}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className='mt-4'>
        <SubmitButton />
      </div>
    </form>
  )
}
