import Link from 'next/link'
import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import DeleteBookingButton from '@/components/DeleteBookingButton'
import { Briefcase, SearchCheck } from 'lucide-react'

export default async function RegularUserBookingCards() {
  const { profile } = await fetchLoggedInUser({ bookings: true })
  if (profile?._count.bookings === 0) {
    return (
      <div className='text-center py-5'>
        <Briefcase />
        <h1>No Bookings Found</h1>
        <p className='text-muted'>You don&apos;t have any active bookings at the moment.</p>
        <Link href='/venues' className='btn btn-primary'>
          Browse Venues
          <SearchCheck />
        </Link>
      </div>
    )
  }

  return (
    <div className='row'>
      {profile?.bookings?.map((booking) => (
        <div className='col-md-6 col-lg-4 mb-4' key={booking.id}>
          <div className='card h-100 shadow-sm'>
            <div className='card-body'>
              <h2 className='h5 card-title'>{booking.venue.name}</h2>
              <p className='card-text'>
                <strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
                <br />
                <strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
              </p>

              <DeleteBookingButton bookingId={booking.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
