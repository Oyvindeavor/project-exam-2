import { Meta } from '../shared'
import { Bookings } from '../bookingTypes'

// /holidaze/bookings Get all bookings
export interface BookingsResponse {
  data: Bookings[]
  meta: Meta
}

// /holidaze/bookings/[id] Get a single booking by id
export interface BookingSingleResponse {
  data: Bookings
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

export interface DeleteBookingRequest {
  id: string
}

export interface DeleteBookingResponse {
  success: boolean
  status: number
}
