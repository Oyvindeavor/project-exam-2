import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import isUserVenueManager from '@/utils/auth/isVenueManager'
import { Metadata } from 'next'
import UserActivityAside from '@/components/UserActivityAside'
import ProfileDetailsSection from '@/components/ProfileDetailsSection'

export const metadata: Metadata = {
  title: 'Profile - Holidaze',
  description: 'Manage your profile and settings.',
}

export default async function ProfileDefaultPage() {
  const { profile, error } = await fetchLoggedInUser({})
  const isManager = profile ? await isUserVenueManager() : false

  if (error || !profile) {
    return (
      <div className='container mt-5 py-5'>
        <div className='alert alert-danger text-center' role='alert'>
          <h2 className='alert-heading h4'>Profile Unavailable</h2>
          <p className='mb-0'>
            We could not load your profile information at this time. Please try again later or
            contact support if the issue persists.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='container mt-4 mb-5'>
        <h2 className='visually-hidden'>Profile Details and Activity</h2>
        <div className='row gx-lg-5'>
          <ProfileDetailsSection profile={profile} />
          <UserActivityAside profile={profile} isManager={isManager} />
        </div>
      </div>
    </>
  )
}
