import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import EditProfileModal from '../EditProfileModal'
import styles from './ProfileHeader.module.scss'

export default async function ProfileHeader() {
  const { profile, error } = await fetchLoggedInUser()

  if (error || !profile) {
    const errorMessage = error?.error || 'Profile data is not available.'
    return (
      <main id='profile-content' className='container mt-5'>
        <div
          className='card border-danger shadow-sm'
          role='alertdialog'
          aria-labelledby='errorHeading'
          aria-describedby='errorDescription'
        >
          <div className='card-body text-danger text-center p-4'>
            <h2 id='errorHeading' className='card-title h4'>
              Error Loading Profile
            </h2>
            <div id='errorDescription'>
              <p className='mb-1'>{errorMessage}</p>
              <p className='mb-0'>
                Could not load your profile data. Please check your connection and try again later.
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <section
      aria-labelledby='profileHeaderTitle'
      className={`card ${styles.profileCard} shadow-lg`}
      style={{
        backgroundImage: `url(${profile.banner?.url || '/default-banner.jpg'})`, // inline style is necessary for dynamic background
      }}
    >
      <div className={styles.profileOverlay}>
        <header className='d-flex flex-column align-items-center'>
          <img
            className={styles.profileImage}
            src={profile.avatar?.url || '/default-avatar.png'}
            alt={profile.avatar?.alt || `${profile.name}'s Profile Avatar`}
          />

          <div className='text-center'>
            <h1 id='profileHeaderTitle' className='h4 mb-0 fw-semibold'>
              {profile.name}
            </h1>
            <p className='mb-0 opacity-75'>{profile.email}</p>
          </div>
          <div className='mt-3'>
            <EditProfileModal profile={profile} />
          </div>
        </header>
      </div>
    </section>
  )
}
