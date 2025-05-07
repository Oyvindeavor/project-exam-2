// components/LoginForm.tsx
'use client'

import { useFormStatus } from 'react-dom'
import { loginFormAction } from './loginFormAction'
import { useActionState } from 'react'
import { useToast } from '@/components/ToastProvider'

const initialState: { error?: string } = { error: undefined }

export default function LoginForm() {
  const [state, formAction] = useActionState(loginFormAction, initialState)

  return (
    <form action={formAction} className='w-100' style={{ maxWidth: 400 }}>
      <h2 className='mb-4'>Login</h2>

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

      {state?.error && <div className='alert alert-danger'>{state.error}</div>}

      <LoginButton />
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
  const { showToast } = useToast()
  return (
    <button
      type='submit'
      className='btn btn-primary w-100'
      disabled={pending}
      onClick={() => showToast('Successfully logged in', '', 'success')}
    >
      {pending ? 'Logging in…' : 'Login'}
    </button>
  )
}
