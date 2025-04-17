'use client'

import { useActionState } from 'react'
import { editProfileAction } from './action'
import { useState, useEffect } from 'react'

export default function EditProfileForm({ name }: { name: string }) {
  const initialState = { success: false, message: '' }
  const [submitting, setSubmitting] = useState(false)
  const [state, formAction] = useActionState(editProfileAction, initialState)

  useEffect(() => {
    if (submitting) {
      setSubmitting(false)
    }
  }, [state, submitting])

  return (
    <form
      action={formAction}
      onSubmit={() => setSubmitting(true)}
      className='max-w-md mx-auto space-y-4'
    >
      <input type='hidden' name='name' value={name} />

      <div>
        <label className='block font-medium'>Bio</label>
        <textarea
          name='bio'
          className='w-full p-2 border rounded'
          placeholder='Write your bio here...'
        />
      </div>

      <div>
        <label className='block font-medium'>Avatar URL</label>
        <input
          name='avatar'
          type='url'
          className='w-full p-2 border rounded'
          placeholder='Enter your avatar URL'
        />
      </div>

      <div>
        <label className='block font-medium'>Banner URL</label>
        <input
          name='banner'
          type='url'
          className='w-full p-2 border rounded'
          placeholder='Enter your banner URL'
        />
      </div>

      <div className='flex items-center space-x-2'>
        <input name='venueManager' type='checkbox' id='venueManager' />
        <label htmlFor='venueManager'>Venue Manager</label>
      </div>

      <button
        type='submit'
        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        disabled={submitting}
      >
        {submitting ? 'Updating...' : 'Update Profile'}
      </button>

      {state.message && (
        <p className={state.success ? 'text-green-600' : 'text-red-600'}>{state.message}</p>
      )}
    </form>
  )
}
