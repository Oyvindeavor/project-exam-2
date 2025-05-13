import Link from 'next/link'
import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import DeleteBookingButton from '@/components/DeleteBookingButton'

export default async function RegularUserBookingCards() {
  const { profile } = await fetchLoggedInUser({ bookings: true })
  if (profile?._count.bookings === 0) {
    return (
      <div className='text-center py-5'>
        <i className='bi bi-calendar-x display-1 text-muted mb-3'></i>
        <h5>No Bookings Found</h5>
        <p className='text-muted'>You don&apos;t have any active bookings at the moment.</p>
        <Link href='/venues' className='btn btn-primary'>
          <i className='bi bi-search me-2'></i>Browse Venues
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
              <h5 className='card-title'>{booking.venue.name}</h5>
              <p className='card-text'>
                <strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
                <br />
                <strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
              </p>
              <Link href={`/bookings/${booking.id}`} className='btn btn-outline-primary btn-sm'>
                View Details
              </Link>
              <DeleteBookingButton bookingId={booking.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
