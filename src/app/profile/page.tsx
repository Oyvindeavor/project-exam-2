import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser' // cached
import { Profile } from '@/types/NoroffApi/profileTypes'
import Feautures from './_components/Features'

export default async function ProfileDefaultPage() {
  const { profile } = (await fetchLoggedInUser({})) as { profile: Profile | null }

  if (!profile) {
    return <p>Could not load profile information.</p>
  }

  return <Feautures name={profile.name} />
}
