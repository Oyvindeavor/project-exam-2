'use client'

import { useActionState, useRef } from 'react'
import CreateBookingButton from './CreateBookingButton'
import createBookingFormAction from './createBookingFormAction'
import DatePickerInput from '../../DatePickerInput/DatePickerInput'
import styles from './CreateBookingForm.module.scss'

const initialState: { error?: string } = { error: undefined }

interface CreateBookingFormProps {
  venueId: string
  venueName?: string
  maxGuests?: number
}

export default function CreateBookingForm({
  venueId,
  maxGuests,
  venueName,
}: CreateBookingFormProps) {
  const [state, formAction] = useActionState(createBookingFormAction, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!formRef.current?.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    formRef.current?.classList.add('was-validated')
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className={`needs-validation ${styles.formWrapper}`}
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className={styles.title}>{venueName}</h2>

      <input type='hidden' name='venueId' value={venueId} />

      <DatePickerInput
        id='dateFrom'
        label='Date from'
        name='dateFrom'
        defaultValue={undefined}
        error={state?.error ? [state.error] : undefined}
        required
        venueId={venueId}
      />

      <DatePickerInput
        id='dateTo'
        label='Date to'
        name='dateTo'
        defaultValue={undefined}
        error={state?.error ? [state.error] : undefined}
        required
        venueId={venueId}
      />

      <div className='form-floating mb-3'>
        <input
          type='number'
          name='guests'
          id='guests'
          className='form-control'
          placeholder='Guests'
          required
          min={1}
          max={maxGuests}
        />
        <label htmlFor='guests'>Guests (max: {maxGuests})</label>
        <div className='invalid-feedback'>Please enter a valid number of guests.</div>
      </div>

      {state?.error && <div className='alert alert-danger'>{state.error}</div>}

      <CreateBookingButton />
    </form>
  )
}
