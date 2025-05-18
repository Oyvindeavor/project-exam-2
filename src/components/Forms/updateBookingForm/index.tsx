'use client'

import React, { useActionState, useEffect, useRef } from 'react'
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
  const venueId = booking.venue?.id
  const formRef = useRef<HTMLFormElement>(null)

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
    if (state?.message && !state?.success) {
      console.error('Form Error Message:', state.message)
    }
    if (state?.success) {
    }
  }, [state])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!formRef.current?.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    formRef.current?.classList.add('was-validated')
  }

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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      action={formAction}
      className='w-100 p-4 border rounded shadow-sm bg-light needs-validation'
      noValidate
    >
      <h2 className='mb-4 text-center'>Update Booking</h2>

      {/* Server-side error messages */}
      {state?.errors?.apiError && (
        <div className='alert alert-danger' role='alert'>
          {state.errors.apiError.join(', ')}
        </div>
      )}

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

      {/* Date Pickers */}
      <DatePickerInput
        id='dateFrom'
        label='Check-in Date'
        name='dateFrom'
        defaultValue={getDefaultValue('dateFrom') as string}
        error={state?.errors?.dateFrom}
        required
        venueId={venueId ?? ''}
      />

      <DatePickerInput
        id='dateTo'
        label='Check-out Date'
        name='dateTo'
        defaultValue={getDefaultValue('dateTo') as string}
        error={state?.errors?.dateTo}
        required
        venueId={venueId ?? ''}
      />

      {/* Guests input */}
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
        />
        <div className='invalid-feedback'>
          {state?.errors?.guests?.join(', ') || 'Please enter a valid number of guests.'}
        </div>
      </div>

      {/* Submit */}
      <div className='mt-4'>
        <SubmitButton />
      </div>
    </form>
  )
}
