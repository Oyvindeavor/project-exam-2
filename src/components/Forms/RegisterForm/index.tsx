'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import registerFormAction from './registerFormAction'
import { useToast } from '@/components/ToastProvider'

const initialState: { error?: string } = { error: undefined }

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerFormAction, initialState)

  return (
    <form action={formAction} className='w-100'>
      <h2 className='mb-4'>Register</h2>

      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input type='text' name='name' id='name' className='form-control' required />
      </div>

      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input type='email' name='email' id='email' className='form-control' required />
      </div>

      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input type='password' name='password' id='password' className='form-control' required />
      </div>

      <div className='form-check mb-3'>
        <input type='checkbox' name='venueManager' id='venueManager' className='form-check-input' />
        <label htmlFor='venueManager' className='form-check-label'>
          Register as Venue Manager
        </label>
      </div>

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
