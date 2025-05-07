'use client'

import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import fetchVenueById from '@/utils/api/venues/fetchVenueById'
import type { Bookings } from '@/types/NoroffApi/bookingTypes'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerInputProps {
  id: string
  label: string
  name: string
  defaultValue?: string
  error?: string[]
  required?: boolean
  venueId: string
}

export default function DatePickerInput({
  id,
  label,
  name,
  defaultValue,
  error,
  required = true,
  venueId, // Pass the venueId as a prop
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [bookedDates, setBookedDates] = useState<Date[]>([])

  // Fetch booked dates from the API
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetchVenueById(venueId, {
          _bookings: true,
        })
        const bookedDates = (response.venue?.bookings ?? []).flatMap((booking: Bookings) => {
          const startDate = new Date(booking.dateFrom)
          const endDate = new Date(booking.dateTo)
          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            const dates = []
            for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
              dates.push(new Date(date))
            }
            return dates
          }
          return []
        })
        setBookedDates(bookedDates)
      } catch (error) {
        console.error('Error fetching booked dates:', error)
      }
    }

    fetchBookedDates()
  }, [venueId])

  useEffect(() => {
    if (defaultValue) {
      const parsedDate = new Date(defaultValue)
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate)
      }
    }
  }, [defaultValue])

  return (
    <div className='mb-3 '>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat='yyyy-MM-dd'
        className={`form-control ${error?.length ? 'is-invalid' : ''}`}
        placeholderText='Select a date'
        required={required}
        minDate={addDays(new Date(), 1)} // this blocks today + all past dates
        excludeDates={bookedDates} // Exclude booked dates
      />

      {error?.length && <div className='invalid-feedback d-block'>{error.join(', ')}</div>}
      {/* Hidden input to submit the ISO date string */}
      <input
        type='hidden'
        name={name}
        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
      />
    </div>
  )
}
