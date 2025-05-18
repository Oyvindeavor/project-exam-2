'use client'

import { useFormStatus } from 'react-dom'
import { loginFormAction } from './loginFormAction'
import { useActionState, useRef, useEffect } from 'react'
import { UserPlus, LogIn } from 'lucide-react'
import Link from 'next/link'
interface LoginFormState {
  error?: string
}

const initialState: LoginFormState = { error: undefined }

export default function LoginForm() {
  const [state, formAction] = useActionState(loginFormAction, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state?.error) {
      emailInputRef.current?.focus()
    }
  }, [state?.error])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = formRef.current
    if (form && !form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
      const firstInvalidField = form.querySelector<HTMLElement>(':invalid:not(fieldset)')
      if (firstInvalidField) {
        firstInvalidField.focus()
      }
    }

    form?.classList.add('was-validated')
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className='needs-validation'
      noValidate
      aria-labelledby='login-form-heading'
    >
      <h1 id='login-form-heading' className='h3 mb-4 text-center'>
        Sign In
      </h1>

      {/* Email */}
      <div className='form-floating mb-3'>
        <input
          ref={emailInputRef}
          type='email'
          name='email'
          id='loginEmailInput'
          className='form-control'
          placeholder='name@stud.noroff.no'
          required
          pattern='^[^@\s]+@stud\.noroff\.no$'
          aria-describedby='email-error-message'
        />
        <label htmlFor='loginEmailInput'>Email (@stud.noroff.no)</label>
        <div id='email-error-message' className='invalid-feedback'>
          Please provide a valid @stud.noroff.no email address (e.g., user@stud.noroff.no).
        </div>
      </div>

      {/* Password */}
      <div className='form-floating mb-3'>
        <input
          ref={passwordInputRef}
          type='password'
          name='password'
          id='loginPasswordInput'
          className='form-control'
          placeholder='Password'
          required
          minLength={8}
          aria-describedby='password-error-message'
        />
        <label htmlFor='loginPasswordInput'>Password</label>
        <div id='password-error-message' className='invalid-feedback'>
          Password is required and must be at least 8 characters long, are you sure you are using
          the right one?
        </div>
      </div>

      {/* Server-side error message */}
      {state?.error && (
        <div className='alert alert-danger mt-3' role='alert'>
          {state.error}
        </div>
      )}

      <LoginButton />

      <div className='text-center mt-4'>
        <Link href='register' className='text-decoration-none'>
          <UserPlus size={16} className='me-1' /> Don&apos;t have an account? Sign up
        </Link>
      </div>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='btn btn-primary w-100 py-2 mt-3'
      disabled={pending}
      aria-label={pending ? 'Attempting to log in' : 'Log in to your account'}
    >
      {pending ? (
        <>
          <span
            className='spinner-border spinner-border-sm me-2'
            role='status'
            aria-hidden='true'
          ></span>
          Logging in…
        </>
      ) : (
        <>
          <LogIn className='me-2' />
          Login
        </>
      )}
    </button>
  )
}
