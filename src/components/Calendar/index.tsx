'use client'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import styles from './Calendar.module.scss'

interface Booking {
  dateFrom: string
  dateTo: string
}

interface CalendarProps {
  bookings: Booking[]
}

export default function Calendar({ bookings = [] }: CalendarProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getUnavailableDates = (bookings: Booking[]) => {
    const dates: Date[] = []

    bookings.forEach(({ dateFrom, dateTo }) => {
      const start = new Date(dateFrom)
      const end = new Date(dateTo)

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = new Date(d)
        day.setHours(0, 0, 0, 0)
        dates.push(new Date(day))
      }
    })

    return dates
  }

  const bookedDates = getUnavailableDates(bookings)

  return (
    <DayPicker
      disabled={[
        { before: today }, // Disable all past days
        ...bookedDates, // Disable booked days
      ]}
      modifiers={{
        available: (day) =>
          day >= today &&
          !bookedDates.some(
            (d) =>
              d.getFullYear() === day.getFullYear() &&
              d.getMonth() === day.getMonth() &&
              d.getDate() === day.getDate()
          ),
      }}
      modifiersClassNames={{
        disabled: styles.dayDisabled,
        available: styles.dayAvailable,
        today: styles.dayToday,
        navigator: styles.navigator,
      }}
      className='rounded border p-4 shadow-sm'
    />
  )
}
