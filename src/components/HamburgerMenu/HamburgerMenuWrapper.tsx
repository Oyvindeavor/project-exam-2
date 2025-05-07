import dynamic from 'next/dynamic'
import styles from './HamburgerMenu.module.scss' 
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'
import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'

const loadingComponent = () => <div className={styles.hamburgerLoading}></div>

// Dynamically import the main HamburgerMenu component
const HamburgerMenu = dynamic(
  () => import('./index'), 
  {
    loading: loadingComponent, 
  }
)

// This wrapper simply renders the dynamically imported component
export default async function HamburgerMenuWrapper() {
  const isLoggedIn = await isUserLoggedIn()
  const { profile } = await fetchLoggedInUser()

  const avatarUrl = profile?.avatar.url
  const profileName = profile?.name

  return <HamburgerMenu avatarUrl={avatarUrl} profileName={profileName} isLoggedIn={isLoggedIn} />
}
