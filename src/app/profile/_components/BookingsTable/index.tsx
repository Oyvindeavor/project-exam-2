'use client'

import React, { useState, useEffect, useMemo } from 'react'
import BookingControls from './BookingControls'
import BookingsDisplay from './BookingsDisplay'
import { ProcessedBookingItem } from './BookingListItem'
import type { Venues } from '@/types/NoroffApi/venueTypes'

interface Props {
  venues: Venues[]
}

function calculateBookingDurationInDays(dateFromStr: string, dateToStr: string): number {
  const dateFrom = new Date(dateFromStr)
  const dateTo = new Date(dateToStr)

  dateFrom.setHours(0, 0, 0, 0)
  dateTo.setHours(0, 0, 0, 0)

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
    // Dynamically import Bootstrap's Collapse module
    import('bootstrap/js/dist/collapse').catch((err) =>
      console.error('Failed to load Bootstrap Collapse JS', err)
    )
  }, [])

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const processedBookings: ProcessedBookingItem[] = useMemo(() => {
    const allBookings: ProcessedBookingItem[] = []

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

        const venueNameMatch = booking.venueName?.toLowerCase().includes(lowerSearchTerm)
        const customerNameMatch = booking.customer?.name?.toLowerCase().includes(lowerSearchTerm)
        const customerEmailMatch = booking.customer?.email?.toLowerCase().includes(lowerSearchTerm)

        const dateFromMatch = new Date(booking.dateFrom)
          .toLocaleDateString()
          .includes(lowerSearchTerm)
        const dateToMatch = new Date(booking.dateTo).toLocaleDateString().includes(lowerSearchTerm)
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
    <div className='venue-manager-bookings-container py-3'>
      <BookingControls
        venues={venues}
        selectedVenueId={selectedVenueId}
        setSelectedVenueId={setSelectedVenueId}
        dateOrder={dateOrder}
        setDateOrder={setDateOrder}
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <BookingsDisplay
        processedBookings={processedBookings}
        calculateBookingDurationInDays={calculateBookingDurationInDays}
      />
    </div>
  )
}
