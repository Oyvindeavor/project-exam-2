'use client'

import { useFormStatus } from 'react-dom'
import { useActionState, useRef } from 'react'
import registerFormAction from './registerFormAction'
import { useToast } from '@/components/ToastProvider'

const initialState: { error?: string } = { error: undefined }

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerFormAction, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!formRef.current?.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
    }
    formRef.current?.classList.add('was-validated')
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      action={formAction}
      className='w-100 needs-validation'
      noValidate
    >
      <h2 className='mb-4'>Register</h2>

      {/* Name */}
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input type='text' name='name' id='name' className='form-control' required />
        <div className='invalid-feedback'>Please enter your name.</div>
      </div>

      {/* Email */}
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input type='email' name='email' id='email' className='form-control' required />
        <div className='invalid-feedback'>Please enter a valid email address.</div>
      </div>

      {/* Password */}
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input type='password' name='password' id='password' className='form-control' required />
        <div className='invalid-feedback'>Please enter a password.</div>
      </div>

      {/* Venue Manager Checkbox */}
      <div className='form-check mb-3'>
        <input type='checkbox' name='venueManager' id='venueManager' className='form-check-input' />
        <label htmlFor='venueManager' className='form-check-label'>
          Register as Venue Manager
        </label>
      </div>

      {/* Server-side error */}
      {state?.error && <div className='alert alert-danger'>{state.error}</div>}

      <RegisterButton />
    </form>
  )
}

function RegisterButton() {
  const { pending } = useFormStatus()
  const { showToast } = useToast()

  return (
    <button
      type='submit'
      className='btn btn-primary w-100'
      disabled={pending}
      onClick={() => showToast('Successfully registered', '', 'success')}
    >
      {pending ? 'Registering…' : 'Register'}
    </button>
  )
}
