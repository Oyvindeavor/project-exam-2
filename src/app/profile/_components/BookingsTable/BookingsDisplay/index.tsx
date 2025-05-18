'use client'

import React from 'react'
import BookingListItem, { ProcessedBookingItem } from '../BookingListItem'

interface BookingsDisplayProps {
  processedBookings: ProcessedBookingItem[]
  calculateBookingDurationInDays: (dateFromStr: string, dateToStr: string) => number
}

export default function BookingsDisplay({
  processedBookings,
  calculateBookingDurationInDays,
}: BookingsDisplayProps) {
  if (processedBookings.length === 0) {
    return (
      <div className='alert alert-info text-center shadow-sm' role='status'>
        No bookings found matching your criteria.
      </div>
    )
  }

  return (
    <div className='list-group'>
      {processedBookings.map((booking) => (
        <BookingListItem
          key={booking.id} // Key is crucial here for list rendering
          booking={booking}
          calculateBookingDurationInDays={calculateBookingDurationInDays}
        />
      ))}
    </div>
  )
}
