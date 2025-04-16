import LogoutButton from '@/components/LogoutButton'
export default async function Profile() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-4xl font-bold'>Profile</h1>
      <LogoutButton />
    </div>
  )
}
