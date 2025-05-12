import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import EditProfileModal from '../EditProfileModal'

export default async function ProfileHeader() {
  const { profile, error } = await fetchLoggedInUser()

  if (error || !profile) {
    const errorMessage = error?.error || 'Profile data is not available.'
    return (
      <div className='container mt-5'>
        <div className='card border-danger shadow-sm'>
          <div className='card-body text-danger text-center p-4'>
            <h2 className='card-title h4'>Error Loading Profile</h2>
            <p className='mb-1'>{errorMessage}</p>
            <p className='mb-0'>
              Could not load your profile data. Please check your connection and try again later.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className='card text-white mb-4 shadow-lg'
      style={{
        backgroundImage: `url(${profile.banner?.url || '/default-banner.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='card-body p-4 bg-dark bg-opacity-50 rounded'>
        <div className='d-flex flex-column align-items-center'>
          <img
            className='rounded-circle border border-3 border-light shadow mb-3'
            src={profile.avatar?.url || '/default-avatar.png'}
            alt={profile.avatar?.alt || 'Profile Avatar'}
            width='80'
            height='80'
            style={{ objectFit: 'cover' }}
          />

          <div className='text-center'>
            <h1 className='h4 mb-0 fw-semibold'>{profile.name}</h1>
            <p className='mb-0 opacity-75'>{profile.email}</p>

            {profile.bio && (
              <div className='mt-3 p-3 bg-white text-dark rounded shadow-sm'>
                <p className='mb-0 fst-italic'>{profile.bio}</p>
              </div>
            )}
          </div>

          <div className='mt-3'>
            <EditProfileModal profile={profile} />
          </div>
        </div>
      </div>
    </div>
  )
}
