import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser' // cached
import { Profile } from '@/types/NoroffApi/profileTypes'
import ProfileHeader from './_components/ProfileHeader'
import isUserVenueManager from '@/utils/auth/isVenueManager'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile - Holidaze',
  description: 'Manage your profile and settings.',
}

export default async function ProfileDefaultPage() {
  const { profile } = (await fetchLoggedInUser({})) as { profile: Profile | null }
  const isManager = await isUserVenueManager()

  if (!profile) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-danger' role='alert'>
          Could not load profile information.
        </div>
      </div>
    )
  }

  return (
    <div className='container mb-5'>
      <ProfileHeader />

      <div className='row mt-5'>
        <div className='col-12 col-lg-8 mb-4'>
          <div className={`card shadow-sm `}>
            <div className='card-body p-4'>
              <h2 className='card-title display-6 mb-4'>
                <span>Welcome back,</span> {profile.name}!
              </h2>

              <div className='card-text'>
                {profile.bio ? (
                  <p>{profile.bio}</p>
                ) : (
                  <div className='alert alert-light border'>
                    <div className='d-flex align-items-center'>
                      <span>You have not added a bio yet.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='col-12 col-lg-4'>
          <div className={`card shadow-sm `}>
            <div className='card-header bg-primary text-white'>
              <h5 className='mb-0'>Your Activity</h5>
            </div>
            <div className='card-body'>
              <div className='d-flex align-items-center mb-3'>
                <div className={`me-3 p-3 rounded-circle bg-primary bg-opacity-10 `}></div>
                <div>
                  <h6 className='mb-0'>Bookings</h6>
                  <p className='mb-0 fs-4 fw-bold'>{profile._count.bookings}</p>
                </div>
              </div>

              {isManager && (
                <div className='d-flex align-items-center'>
                  <div className={`me-3 p-3 rounded-circle bg-success bg-opacity-10`}></div>
                  <div>
                    <h6 className='mb-0'>Venues</h6>
                    <p className='mb-0 fs-4 fw-bold'>{profile._count.venues}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
