import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import dynamic from 'next/dynamic'
import AvatarSkeleton from './AvatarSkeleton'

// Dynamically import the main Avatar Client Component
const Avatar = dynamic(
  () => import('./index'), // Assuming './index' exports your Avatar component
  {
    loading: () => {
      // This skeleton shows while Avatar JS bundle loads
      console.log("AvatarWrapper dynamic import: Showing 'loading' skeleton for JS bundle.")
      return <AvatarSkeleton />
    },
  }
)

export default async function AvatarWrapper() {
  // Suspense in NavBar handles waiting for this fetch
  const { profile } = await fetchLoggedInUser()

  if (!profile) return null

  const avatarUrl =
    profile.avatar?.url ||
    'https://cdn-front.freepik.com/images/ai/image-generator/gallery/pikaso-woman.webp'
  const altText = profile.name || 'User avatar'

  // Render the dynamic import
  return <Avatar avatarUrl={avatarUrl} altText={altText} />
}
