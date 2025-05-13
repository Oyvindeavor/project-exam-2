import NavigationTabs from './_components/NavigationTabs'
import ProfileHeader from './_components/ProfileHeader'

interface ProfileLayoutProps {
  children: React.ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className='container py-4'>
      {/* Profile Header */}
      <ProfileHeader />

      {/* Navigation "Tabs"  */}
      <NavigationTabs />

      {/* Content for the current route  */}
      {children}
    </div>
  )
}
