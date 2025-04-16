import LogoutButton from '@/components/LogoutButton'
import { fetchProfileData } from '@/utils/api/fetchProfileData'

export default async function Profile() {
  const { data, error } = await fetchProfileData()
  console.log('Profile data:', data)

  if (error || !data) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-4xl font-bold text-danger'>Error</h1>
        <p className='mt-4 text-lg text-danger'>{error || 'Could not load profile data.'}</p>
        <div className='mt-4'>
          <LogoutButton />
        </div>
      </div>
    )
  }
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-4xl font-bold'>Profile</h1>
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
      {data.bio && <p>Bio: {data.bio}</p>}
      {data.avatar && (
        <img src={data.avatar.url} alt={data.avatar.alt} className='rounded-full w-24 h-24' />
      )}{' '}
      <p className='mt-4 text-lg'>This is your profile page.</p>
      <p className='mt-2 text-sm text-gray-500'>
        You can view and edit your profile information here.
      </p>
      <p>{data.banner.url}</p>
      <div className='mt-4'>
        <LogoutButton />
      </div>
    </div>
  )
}
