'use client'

import { useFormStatus } from 'react-dom'
import { useActionState, useRef } from 'react'
import registerFormAction from './registerFormAction'
import Link from 'next/link'

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
      className='needs-validation'
      noValidate
    >
      {/* Name */}
      <div className='form-floating mb-3'>
        <input
          type='text'
          name='name'
          id='name'
          className='form-control'
          placeholder=' '
          required
        />
        <label htmlFor='name'>Name</label>
        <div className='invalid-feedback'>Please enter your name.</div>
      </div>

      {/* Email */}
      <div className='form-floating mb-3'>
        <input
          type='email'
          name='email'
          id='email'
          className='form-control'
          placeholder=' '
          required
        />
        <label htmlFor='email'>Email</label>
        <div className='invalid-feedback'>Please enter a valid email address.</div>
      </div>

      {/* Password */}
      <div className='form-floating mb-3'>
        <input
          type='password'
          name='password'
          id='password'
          className='form-control'
          placeholder=' '
          required
        />
        <label htmlFor='password'>Password</label>
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

      <div className='text-center mt-3'>
        <p>
          <Link href='/auth/login' className='text-decoration-none'>
            Already have an account? Login
          </Link>
        </p>
      </div>
    </form>
  )
}

function RegisterButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' className='btn btn-primary w-100' disabled={pending}>
      {pending ? 'Registering…' : 'Register'}
    </button>
  )
}
