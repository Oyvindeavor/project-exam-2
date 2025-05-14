import HamburgerMenu from './index'
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'
import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import isUserVenueManager from '@/utils/auth/isVenueManager'

export default async function HamburgerMenuWrapper() {
  const isLoggedIn = await isUserLoggedIn()
  const { profile } = await fetchLoggedInUser()
  const venueManager = await isUserVenueManager()

  return (
    <HamburgerMenu
      avatarUrl={profile?.avatar.url}
      profileName={profile?.name}
      isLoggedIn={isLoggedIn}
      venueManager={venueManager}
    />
  )
}
