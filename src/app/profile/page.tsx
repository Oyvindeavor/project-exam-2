import LogoutButton from '@/components/LogoutButton'
import fetchVenuesByProfileName from '@/utils/api/fetchVenuesByProfileName'
import DeleteVenueButton from '@/components/DeleteVenueFormButton'
import CreateVenueForm from '@/components/CreateVenueForm'
import fetchBookingById from '@/utils/api/bookings/fetchBookingById'
import UpdateBookingForm from '@/components/updateBookingForm'
import DeleteBookingButton from '@/components/DeleteBookingButton'
import Link from 'next/link'
import { cookies } from 'next/headers'
export default async function Profile() {
  const cookieStore = await cookies()
  const profileName = cookieStore.get('name')?.value

  const { venues } = await fetchVenuesByProfileName(profileName as string)
  const { data } = await fetchBookingById('725335f3-d19b-4596-9be0-d69e9ce2f0aa', {
    _customer: true,
    _venue: true,
  })

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-4xl font-bold'>Profile</h1>
      {venues && venues.length > 0 ? (
        <ul className='mt-4'>
          {venues.map((venue) => (
            <li key={venue.id} className='mb-2'>
              <a href={`/venue/${venue.id}`} className='text-blue-500 hover:underline'>
                {venue.name}
              </a>
              <Link href={`/venue/edit/${venue.id}`}>
                <button className='ml-2 text-sm text-gray-500'>Edit</button>
              </Link>

              <DeleteVenueButton id={venue.id} />
            </li>
          ))}
        </ul>
      ) : (
        <p className='mt-4'>No venues found for this profile.</p>
      )}

      <p>Booking by id:</p>
      <h1>{data?.id}</h1>
      <h1>{data?.dateTo}</h1>
      <h2>max Guests: {data?.guests}</h2>
      {data?.id && <DeleteBookingButton bookingId={data.id} />}

      <LogoutButton />
      <CreateVenueForm />
      {data && <UpdateBookingForm booking={data} />}
    </div>
  )
}
