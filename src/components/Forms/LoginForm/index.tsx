'use client'

import { useFormStatus } from 'react-dom'
import { loginFormAction } from './loginFormAction'
import { useActionState } from 'react'
import { useToast } from '@/components/ToastProvider'

const initialState: { error?: string } = { error: undefined }

export default function LoginForm() {
  const [state, formAction] = useActionState(loginFormAction, initialState)

  return (
    <form action={formAction}>
      <h1 className='h3 mb-4 fw-normal'>Sign in</h1>

      <div className='form-floating'>
        <input
          type='email'
          name='email'
          id='floatingInput'
          className='form-control mb-2'
          placeholder='name@stud.noroff.no'
          required
        />
        <label htmlFor='floatingInput' className='form-label'>
          Email
        </label>
      </div>

      <div className='form-floating'>
        <input
          type='password'
          name='password'
          id='floatingPassword'
          className='form-control'
          placeholder='Password'
          required
        />
        <label htmlFor='floatingPassword' className='form-label'>
          Password
        </label>
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
