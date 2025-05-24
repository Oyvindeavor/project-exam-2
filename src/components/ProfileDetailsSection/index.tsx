import { Profile } from '@/types/NoroffApi/profileTypes'

interface ProfileDetailsSectionProps {
  profile: Profile
}

/**
 * Renders a section displaying the user's profile details, including a welcome message and bio.
 *
 * @param profile - The profile object containing user details such as name and bio.
 * @returns A section element with the user's name and bio, or a placeholder if the bio is missing.
 *
 * @example
 * <ProfileDetailsSection profile={{ name: 'Oyvind', bio: 'Software Developer' }} />
 * // Renders: "Welcome back, John Doe! Your bio: Software Developer"
 *
 */
export default function ProfileDetailsSection({ profile }: ProfileDetailsSectionProps) {
  return (
    <section className='col-12 col-lg-7 mb-4 mb-lg-0' aria-labelledby='profileDetailsHeading'>
      <div className={`card shadow-sm h-100`}>
        <div className='card-body p-4 p-md-5'>
          <h3 id='profileDetailsHeading' className='card-title h3 mb-3'>
            <span>Welcome back,</span> {profile.name}!
            <span className='visually-hidden'>. View your profile details below.</span>
          </h3>

          <div className='card-text'>
            {profile.bio ? (
              <p className='text-muted'>{profile.bio}</p>
            ) : (
              <div className='p-3 bg-light rounded text-center'>
                <p className='mb-2 text-muted'>Your bio is looking a little empty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
