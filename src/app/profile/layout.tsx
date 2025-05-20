import ProfileHeader from './_components/ProfileHeader'
import NavigationTabs from './_components/NavigationTabs'

interface ProfileLayoutProps {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className='container py-4'>
      <ProfileHeader />
      <NavigationTabs />
      {children}
    </div>
  )
}
