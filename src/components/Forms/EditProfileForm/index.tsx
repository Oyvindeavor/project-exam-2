'use client'

import { useActionState } from 'react'
import { editProfileAction } from './editProfileAction'
import { useState, useEffect } from 'react'
import type { Profile } from '@/types/NoroffApi/profileTypes'

interface EditProfileFormProps {
  profile: Profile
}

export default function EditProfileForm({ profile }: EditProfileFormProps) {
  const initialState = { success: false, message: '' }
  const [submitting, setSubmitting] = useState(false)
  const [state, formAction] = useActionState(editProfileAction, initialState)

  useEffect(() => {
    if (submitting) {
      setSubmitting(false)
    }
  }, [state, submitting])

  return (
    <form action={formAction} onSubmit={() => setSubmitting(true)} className=''>
      <input type='hidden' name='name' value={profile.name} />

      <div className='form-floating'>
        <input
          name='avatar'
          type='url'
          className='form-control mt-4 mb-4'
          placeholder='Enter your avatar URL'
          defaultValue={profile.avatar?.url || ''}
          id='avatar'
        />
        <label htmlFor='avatar'>Avatar URL</label>
      </div>

      <div className='form-floating'>
        <input
          name='banner'
          type='url'
          className='form-control'
          placeholder='Enter your banner URL'
          defaultValue={profile.banner?.url || ''}
          id='banner'
        />
        <label htmlFor='banner'>Banner URL</label>
      </div>

      <div className='form-floating'>
        <textarea
          name='bio'
          className='form-control h-auto mt-4 mb-4'
          placeholder='Write your bio here...'
          defaultValue={profile.bio || ''}
          style={{ minHeight: '100px' }}
          id='bio'
        />
        <label htmlFor='bio'>Bio</label>
      </div>

      <button type='submit' className='btn btn-primary w-100' disabled={submitting}>
        {submitting ? 'Updating...' : 'Update Profile'}
      </button>

      {state.message && (
        <p className={`text-center fw-medium ${state.success ? 'text-success' : 'text-danger'}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}
