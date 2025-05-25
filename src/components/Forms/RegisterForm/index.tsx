'use client'

import { useFormStatus } from 'react-dom'
import { useActionState, useRef, useEffect } from 'react'
import registerFormAction from './registerFormAction'
import Link from 'next/link'
import { UserPlus, LogIn } from 'lucide-react'

interface RegisterFormState {
  error?: string
}

const initialState: RegisterFormState = { error: undefined }

export default function RegisterForm() {
  const [state, formAction] = useActionState<RegisterFormState, FormData>(
    registerFormAction,
    initialState
  )
  const formRef = useRef<HTMLFormElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const form = formRef.current

    if (state?.error) {
      // Remove Bootstrap validation class
      if (form?.classList.contains('was-validated')) {
        form.classList.remove('was-validated')
      }

      // Focus logic depending on error type
      if (state.error.toLowerCase().includes('email')) {
        emailInputRef.current?.focus()
      } else {
        nameInputRef.current?.focus()
      }
    }
  }, [state?.error])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = formRef.current
    if (form) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        const firstInvalidField = form.querySelector<HTMLElement>(':invalid:not(fieldset)')
        if (firstInvalidField) {
          firstInvalidField.focus()
        }
        form.classList.add('was-validated')
      }
    } else {
      event.preventDefault()
    }
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className='needs-validation'
      noValidate
    >
      {/* Name */}
      <div className='form-floating mb-3'>
        <input
          ref={nameInputRef}
          type='text'
          name='name'
          id='registerNameInput'
          className='form-control'
          placeholder='Full Name'
          required
          minLength={2}
          aria-describedby='name-error-message'
          title='Please enter your full name (at least 2 characters).'
        />
        <label htmlFor='registerNameInput'>Username</label>
        <div id='name-error-message' className='invalid-feedback'>
          Please enter your name (at least 2 characters).
        </div>
      </div>

      {/* Email */}
      <div className='form-floating mb-3'>
        <input
          ref={emailInputRef}
          type='email'
          name='email'
          id='registerEmailInput'
          className='form-control'
          placeholder='name@stud.noroff.no'
          required
          pattern='^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$'
          title='Email must be a valid @stud.noroff.no address.'
          aria-describedby='email-error-message'
        />
        <label htmlFor='registerEmailInput'>Email (@stud.noroff.no)</label>
        <div id='email-error-message' className='invalid-feedback'>
          Please enter a valid Noroff email address
        </div>
      </div>

      {/* Password */}
      <div className='form-floating mb-3'>
        <input
          type='password'
          name='password'
          id='registerPasswordInput'
          className='form-control'
          placeholder='Password'
          required
          minLength={8}
          aria-describedby='password-error-message'
          title='Password must be at least 8 characters long.'
        />
        <label htmlFor='registerPasswordInput'>Password</label>
        <div id='password-error-message' className='invalid-feedback'>
          Password is required and must be at least 8 characters.
        </div>
      </div>

      {/* Venue Manager Checkbox */}
      <div className='form-check mb-3'>
        <input
          type='checkbox'
          name='venueManager'
          id='registerVenueManager'
          className='form-check-input'
        />
        <label htmlFor='registerVenueManager' className='form-check-label'>
          Register as Venue Manager (Optional)
        </label>
      </div>

      {state?.error && (
        <div id='server-error-alert' className='alert alert-danger mt-3' role='alert'>
          {state.error}
        </div>
      )}

      <RegisterButton />

      <div className='text-center mt-4'>
        <Link href='/auth/login' className='text-decoration-none d-inline-flex align-items-center'>
          <LogIn size={16} className='me-1' /> Already have an account? Login
        </Link>
      </div>
    </form>
  )
}

function RegisterButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='btn btn-primary w-100 py-2 mt-3'
      disabled={pending}
      aria-label={pending ? 'Processing registration' : 'Create account'}
    >
      {pending ? (
        <>
          <span
            className='spinner-border spinner-border-sm me-2'
            role='status'
            aria-hidden='true'
          ></span>
          Registering…
        </>
      ) : (
        <>
          <UserPlus size={18} className='me-2' /> Register
        </>
      )}
    </button>
  )
}
