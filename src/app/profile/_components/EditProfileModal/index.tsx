'use client'
import { useEffect } from 'react'
import EditProfileForm from '@/components/Forms/EditProfileForm'
import { Edit } from 'lucide-react'
import type { Profile } from '@/types/NoroffApi/profileTypes'

interface EditProfileModalProps {
  profile: Profile
}

export default function EditProfileModal({ profile }: EditProfileModalProps) {
  useEffect(() => {
    import('bootstrap/js/dist/modal')
  }, [])

  return (
    <div className='container p-2'>
      {/* Trigger Button for Modal */}
      <button
        type='button'
        className='btn btn-sm btn-light'
        data-bs-toggle='modal'
        data-bs-target='#editProfileModal'
      >
        Edit Profile
        <Edit className='ms-2' />
      </button>

      {/* Modal Structure */}
      <div
        className='modal fade'
        id='editProfileModal'
        tabIndex={-1}
        aria-labelledby='editProfileModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            {/* Modal Header */}
            <div className='modal-header'>
              <h5 className='modal-title' id='editProfileModalLabel'>
                Edit Profile
                <Edit className='ms-2' />
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>

            {/* Modal Body */}
            <div className='modal-body'>
              <EditProfileForm profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
