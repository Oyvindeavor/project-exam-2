import NavigationTabs from './_components/NavigationTabs'

interface ProfileLayoutProps {
  children: React.ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className='container py-4'>
      {/* Navigation "Tabs"  */}
      <NavigationTabs />

      {/* Content for the current route  */}
      {children}
    </div>
  )
}
