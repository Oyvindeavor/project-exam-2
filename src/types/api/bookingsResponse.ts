import { Meta } from './shared'
import { Booking } from './bookings'

// /holidaze/bookings Get all bookings
export interface BookingsResponse {
  data: Booking[]
  meta: Meta
}

// /holidaze/bookings/[id] Get a single booking by id
export interface BookingSingleResponse {
  data: Booking
  meta: Meta
}

// /holidaze/bookings POST Create a new booking
export interface CreateBookingRequest {
  dateFrom: string
  dateTo: string
  guests: number
  venueId: string
}

export interface CreateBookingResponse {
  data: {
    id: string
    dateFrom: string
    dateTo: string
    guests: number
    created: string
    updated: string
  }
  meta: Meta
}

// /holidaze/bookings/[id] PUT Update a booking by id
export interface UpdateBookingRequest {
  dateFrom?: string
  dateTo?: string
  guests?: number
}

export interface UpdateBookingResponse {
  data: {
    id: string
    dateFrom: string
    dateTo: string
    guests: number
    created: string
    updated: string
  }
  meta: Meta
}
