'use client'

import React from 'react'
import type { Venues } from '@/types/NoroffApi/venueTypes'

interface BookingControlsProps {
  venues: Venues[]
  selectedVenueId: string
  setSelectedVenueId: (value: string) => void
  dateOrder: 'asc' | 'desc'
  setDateOrder: (value: 'asc' | 'desc') => void
  filter: 'all' | 'upcoming' | 'past'
  setFilter: (value: 'all' | 'upcoming' | 'past') => void
  searchTerm: string
  setSearchTerm: (value: string) => void
}

export default function BookingControls({
  venues,
  selectedVenueId,
  setSelectedVenueId,
  dateOrder,
  setDateOrder,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}: BookingControlsProps) {
  return (
    <div className='card mb-4 shadow-sm'>
      <div className='card-header bg-light'>
        <h2 className='h5 mb-0 py-1'>Filter & Sort Bookings</h2>
      </div>
      <div className='card-body'>
        <div className='row g-3'>
          <div className='col-md-6 col-lg-4'>
            <label htmlFor='searchTermInput' className='form-label visually-hidden'>
              Search Bookings
            </label>
            <input
              id='searchTermInput'
              type='text'
              className='form-control'
              placeholder='Search venue, customer, date...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label='Search bookings by venue, customer, or date'
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
              aria-label='Filter by specific venue'
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
              aria-label='Sort bookings by date'
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
              aria-label='Filter bookings by period (all, upcoming, past)'
            >
              <option value='all'>All Bookings</option>
              <option value='upcoming'>Upcoming</option>
              <option value='past'>Past</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
