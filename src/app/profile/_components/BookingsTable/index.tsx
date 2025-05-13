'use client'

import React, { useState, useEffect, useMemo } from 'react'
import DeleteBookingButton from '@/components/DeleteBookingButton'
import type { Venues, Booking } from '@/types/NoroffApi/venueTypes'
import { formatDate } from 'date-fns'

interface Props {
  venues: Venues[]
}

function calculateBookingDurationInDays(dateFromStr: string, dateToStr: string): number {
  const dateFrom = new Date(dateFromStr)
  const dateTo = new Date(dateToStr)

  dateFrom.setHours(0, 0, 0, 0)
  dateTo.setHours(0, 0, 0, 0)

  if (dateTo < dateFrom) {
    console.warn('Booking end date is before start date.')
    return 0
  }

  const diffTime = dateTo.getTime() - dateFrom.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays + 1
}

export default function VenueManagerBookingsTable({ venues }: Props) {
  const [selectedVenueId, setSelectedVenueId] = useState<string>('')
  const [dateOrder, setDateOrder] = useState<'asc' | 'desc'>('asc')
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    import('bootstrap/js/dist/collapse')
      .then(() => {})
      .catch((err) => console.error('Failed to load Bootstrap Collapse JS', err))
  }, [])

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const processedBookings = useMemo(() => {
    const allBookings: (Booking & { venueName: string; venuePrice: number; venueId: string })[] = []

    venues
      .filter((venue) => !selectedVenueId || venue.id === selectedVenueId)
      .forEach((venue) => {
        venue.bookings?.forEach((booking) => {
          allBookings.push({
            ...booking,
            venueName: venue.name,
            venuePrice: venue.price,
            venueId: venue.id,
          })
        })
      })

    return allBookings
      .filter((booking) => {
        const bookingDateFrom = new Date(booking.dateFrom)
        bookingDateFrom.setHours(0, 0, 0, 0)
        if (filter === 'upcoming') return bookingDateFrom >= today
        if (filter === 'past') return bookingDateFrom < today
        return true
      })
      .filter((booking) => {
        if (!searchTerm) return true
        const lowerSearchTerm = searchTerm.toLowerCase()
        const venueNameMatch = booking.venueName.toLowerCase().includes(lowerSearchTerm)
        const customerNameMatch = booking.customer.name.toLowerCase().includes(lowerSearchTerm)
        const customerEmailMatch = booking.customer.email.toLowerCase().includes(lowerSearchTerm)
        const dateFromMatch = new Date(booking.dateFrom)
          .toLocaleDateString()
          .toLowerCase()
          .includes(lowerSearchTerm)
        const dateToMatch = new Date(booking.dateTo)
          .toLocaleDateString()
          .toLowerCase()
          .includes(lowerSearchTerm)
        return (
          venueNameMatch || customerNameMatch || customerEmailMatch || dateFromMatch || dateToMatch
        )
      })
      .sort((a, b) => {
        const dateA = new Date(a.dateFrom).getTime()
        const dateB = new Date(b.dateFrom).getTime()
        return dateOrder === 'asc' ? dateA - dateB : dateB - dateA
      })
  }, [venues, selectedVenueId, filter, searchTerm, dateOrder, today])

  return (
    <div>
      {/* Controls Card */}
      <div className='card mb-4 shadow-sm'>
        <div className='card-header bg-light'>
          <h2 className='h5 mb-0 py-1'>Filter & Sort Bookings</h2>
        </div>
        <div className='card-body'>
          <div className='row g-2'>
            <div className='col-md-6 col-lg-4'>
              <label htmlFor='searchTermInput' className='form-label visually-hidden'>
                Search
              </label>
              <input
                id='searchTermInput'
                type='text'
                className='form-control'
                placeholder='Search venue, customer, date...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='col-md-6 col-lg-3'>
              <label htmlFor='venueSelect' className='form-label visually-hidden'>
                Select Venue
              </label>
              <select
                id='venueSelect'
                className='form-select'
                value={selectedVenueId}
                onChange={(e) => setSelectedVenueId(e.target.value)}
                aria-label='Select Venue'
              >
                <option value=''>All Venues</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-6 col-lg-auto'>
              <label htmlFor='dateOrderSelect' className='form-label visually-hidden'>
                Sort by Date
              </label>
              <select
                id='dateOrderSelect'
                className='form-select'
                value={dateOrder}
                onChange={(e) => setDateOrder(e.target.value as 'asc' | 'desc')}
                aria-label='Sort by date'
              >
                <option value='asc'>Date Ascending ↑</option>
                <option value='desc'>Date Descending ↓</option>
              </select>
            </div>
            <div className='col-md-6 col-lg-auto'>
              <label htmlFor='filterSelect' className='form-label visually-hidden'>
                Filter by Period
              </label>
              <select
                id='filterSelect'
                className='form-select'
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'upcoming' | 'past')}
                aria-label='Filter by period'
              >
                <option value='all'>All Bookings</option>
                <option value='upcoming'>Upcoming</option>
                <option value='past'>Past</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {processedBookings.length > 0 ? (
        <div className='list-group'>
          {processedBookings.map((booking) => {
            const bookingDays = calculateBookingDurationInDays(booking.dateFrom, booking.dateTo)
            const totalPrice = bookingDays * booking.venuePrice
            const collapseId = `bookingCollapse-${booking.id}`

            return (
              <div
                key={booking.id}
                className='list-group-item list-group-item-action flex-column align-items-start p-3 mb-3 border rounded shadow-sm'
              >
                <div className='d-flex w-100 justify-content-between'>
                  <h5 className='mb-1 text-primary'>{booking.venueName}</h5>
                  <small className='text-muted'>
                    Booked: {formatDate(new Date(booking.created), 'dd-MM-yyyy')}
                  </small>
                </div>
                <p className='mb-1'>
                  <span className='fw-bold'>Dates:</span>{' '}
                  {formatDate(new Date(booking.dateFrom), 'dd-MM-yyyy')} -{' '}
                  {formatDate(new Date(booking.dateTo), 'dd-MM-yyyy')} ({bookingDays} day
                  {bookingDays !== 1 ? 's' : ''})
                </p>
                <p className='mb-1'>
                  <span className='fw-bold'>Guests:</span> {booking.guests}
                </p>
                <p className='mb-2'>
                  <span className='fw-bold'>Total Price:</span> ${totalPrice.toFixed(2)}
                  <small className='text-muted ms-1'>(${booking.venuePrice.toFixed(2)}/day)</small>
                </p>

                <div className='mb-2'>
                  <button
                    className='btn btn-sm btn-outline-secondary'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#${collapseId}`}
                    aria-expanded='false'
                    aria-controls={collapseId}
                  >
                    <i className='bi bi-person-lines-fill me-1'></i> Customer Details
                  </button>
                </div>

                <div className='collapse' id={collapseId}>
                  <div className='card card-body bg-light py-2 px-3 mt-2'>
                    <p className='mb-1'>
                      <span className='fw-bold'>Name:</span> {booking.customer.name}
                    </p>
                    <p className='mb-0'>
                      <span className='fw-bold'>Email:</span>{' '}
                      <a href={`mailto:${booking.customer.email}`}>{booking.customer.email}</a>
                    </p>
                    <small className='text-muted mt-1'>Booking ID: {booking.id}</small>
                  </div>
                </div>

                <div className='mt-3 d-flex justify-content-end'>
                  <DeleteBookingButton bookingId={booking.id} />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='alert alert-info text-center' role='alert'>
          No bookings found matching your criteria.
        </div>
      )}
    </div>
  )
}
