'use client'

import React from 'react'
import type { Booking } from '@/types/NoroffApi/venueTypes'
import { formatDate } from 'date-fns'
import { User2Icon } from 'lucide-react'

export interface ProcessedBookingItem extends Booking {
  venueName: string
  venuePrice: number
  venueId: string
}

interface BookingListItemProps {
  booking: ProcessedBookingItem
  calculateBookingDurationInDays: (dateFromStr: string, dateToStr: string) => number
}

export default function BookingListItem({
  booking,
  calculateBookingDurationInDays,
}: BookingListItemProps) {
  const bookingDays = calculateBookingDurationInDays(booking.dateFrom, booking.dateTo)
  const totalPrice = bookingDays * booking.venuePrice
  const collapseId = `bookingCollapse-${booking.id}` // Unique ID for ARIA and collapse functionality

  return (
    <div className='list-group-item list-group-item-action flex-column align-items-start p-3 mb-3 border rounded shadow-sm'>
      <div className='d-flex w-100 justify-content-between align-items-center'>
        <h3 className='h5 mb-1 text-primary'>{booking.venueName}</h3>
        <small className='text-muted'>
          Booked: {formatDate(new Date(booking.created), 'dd MMM yyyy')}
        </small>
      </div>
      <p className='mb-1'>
        <span className='fw-semibold'>Dates:</span>
        {formatDate(new Date(booking.dateFrom), 'dd MMM yyyy')}
        {formatDate(new Date(booking.dateTo), 'dd MMM yyyy')}
        <span className='text-muted ms-1'>
          ({bookingDays} day{bookingDays !== 1 ? 's' : ''})
        </span>
      </p>
      <p className='mb-1'>
        <span className='fw-semibold'>Guests:</span> {booking.guests}
      </p>
      <p className='mb-2'>
        <span className='fw-semibold'>Total Price:</span> ${totalPrice.toFixed(2)}
        <small className='text-muted ms-1'>(${booking.venuePrice.toFixed(2)}/day)</small>
      </p>

      <div className='mb-2'>
        <button
          className='btn btn-sm btn-outline-secondary text-dark d-inline-flex align-items-center'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#${collapseId}`}
          aria-expanded='false'
          aria-controls={collapseId}
        >
          <User2Icon size={16} className='me-2' />
          Customer Details
        </button>
      </div>

      <div className='collapse' id={collapseId}>
        <div className='card card-body bg-light py-2 px-3 mt-2 border-0 rounded'>
          <p className='mb-1'>
            <span className='fw-semibold'>Name:</span> {booking.customer.name}
          </p>
          <p className='mb-0'>
            <span className='fw-semibold'>Email:</span>{' '}
            <a href={`mailto:${booking.customer.email}`} className='text-decoration-none'>
              {booking.customer.email}
            </a>
          </p>
          <small className='text-muted mt-1 d-block'>Booking ID: {booking.id}</small>{' '}
        </div>
      </div>
    </div>
  )
}
