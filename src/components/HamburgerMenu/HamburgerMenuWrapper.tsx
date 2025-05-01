// src/components/HamburgerMenu/HamburgerMenuWrapper.tsx
import dynamic from 'next/dynamic'
import styles from './HamburgerMenu.module.scss' // Ensure path is correct
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'
import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'

// Define the loading component/element for the dynamic import phase
// This JSX should visually match LoadingSkeleton in HamburgerMenu.tsx
const loadingComponent = () => <div className={styles.hamburgerLoading}></div>

// Dynamically import the main HamburgerMenu component
const HamburgerMenu = dynamic(
  () => import('./index'), // Assuming './index' exports your HamburgerMenu component
  {
    loading: loadingComponent, // Shows while JS bundle is loading
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
