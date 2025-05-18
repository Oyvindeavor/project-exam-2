import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import dynamic from 'next/dynamic'
import AvatarSkeleton from './AvatarSkeleton'
import isUserVenueManager from '@/utils/auth/isVenueManager'

// Dynamically import the main Avatar Client Component
const Avatar = dynamic(() => import('./index'), {
  loading: () => {
    // This skeleton shows while Avatar JS bundle loads
    return <AvatarSkeleton />
  },
})

export default async function AvatarWrapper() {
  const { profile } = await fetchLoggedInUser()
  const venueManager = await isUserVenueManager()

  if (!profile) return null

  const avatarUrl =
    profile.avatar?.url ||
    'https://cdn-front.freepik.com/images/ai/image-generator/gallery/pikaso-woman.webp'
  const altText = profile.name || 'User avatar'

  return <Avatar avatarUrl={avatarUrl} altText={altText} venueManager={venueManager} />
}
