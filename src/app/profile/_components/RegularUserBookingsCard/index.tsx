import Link from 'next/link'
import { fetchLoggedInUser } from '@/utils/auth/fetchLoggedInUser'
import DeleteBookingButton from '@/components/DeleteBookingButton'
import { Briefcase, SearchCheck, CalendarDays, Users, DollarSign } from 'lucide-react'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export default async function RegularUserBookingCards() {
  const { profile } = await fetchLoggedInUser({ bookings: true })
  if (profile?._count.bookings === 0) {
    return (
      <div className='text-center py-5'>
        <Briefcase size={48} className='mx-auto mb-3 text-muted' />
        <h1 className='mb-2'>No Bookings Found</h1>
        <p className='text-muted mb-4'>You don&apos;t have any active bookings at the moment.</p>
        <Link href='/venues' className='btn btn-primary d-inline-flex align-items-center gap-2'>
          Browse Venues
          <SearchCheck />
        </Link>
      </div>
    )
  }

  return (
    <div className='row'>
      {profile?.bookings?.map((booking) => {
        const fromDate = new Date(booking.dateFrom)
        const toDate = new Date(booking.dateTo)
        const diffTime = toDate.getTime() - fromDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        const totalPrice = diffDays * booking.venue.price

        return (
          <div className='col-md-6 col-lg-4 mb-4' key={booking.id}>
            <div className='card h-100 shadow-sm'>
              <div className='card-body d-flex flex-column justify-content-between'>
                <div>
                  <h2 className='h5 card-title mb-3'>{booking.venue.name}</h2>

                  <div className='mb-2 d-flex flex-column gap-1'>
                    <div className='d-flex align-items-center gap-2'>
                      <CalendarDays size={16} className='text-primary' />
                      <span>
                        <strong>From:</strong> {fromDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                      <CalendarDays size={16} className='text-primary' />
                      <span>
                        <strong>To:</strong> {toDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                      <Users size={16} className='text-primary' />
                      <span>
                        <strong>Guests:</strong> {booking.guests}
                      </span>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                      <DollarSign size={16} className='text-primary' />
                      <span>
                        <strong>Price:</strong> {currencyFormatter.format(booking.venue.price)} per
                        night
                      </span>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                      <DollarSign size={16} className='text-success' />
                      <span>
                        <strong>Total Price:</strong> {currencyFormatter.format(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                <DeleteBookingButton bookingId={booking.id} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
