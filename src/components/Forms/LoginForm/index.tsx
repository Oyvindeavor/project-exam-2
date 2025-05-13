'use client'

import { useFormStatus } from 'react-dom'
import { loginFormAction } from './loginFormAction'
import { useActionState, useRef } from 'react'

const initialState: { error?: string } = { error: undefined }

export default function LoginForm() {
  const [state, formAction] = useActionState(loginFormAction, initialState)
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
      <h1 className='h3 mb-4 text-center'>Sign In</h1>

      {/* Email */}
      <div className='form-floating mb-3'>
        <input
          type='email'
          name='email'
          id='floatingInput'
          className='form-control'
          placeholder='name@stud.noroff.no'
          required
        />
        <label htmlFor='floatingInput'>Email</label>
        <div className='invalid-feedback'>Please enter a valid email address.</div>
      </div>

      {/* Password */}
      <div className='form-floating mb-3'>
        <input
          type='password'
          name='password'
          id='floatingPassword'
          className='form-control'
          placeholder='Password'
          required
        />
        <label htmlFor='floatingPassword'>Password</label>
        <div className='invalid-feedback'>Password is required.</div>
      </div>

      {/* Server-side error */}
      {state?.error && <div className='alert alert-danger'>{state.error}</div>}

      <LoginButton />
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' className='btn btn-primary w-100' disabled={pending}>
      {pending ? 'Logging in…' : 'Login'}
    </button>
  )
}
