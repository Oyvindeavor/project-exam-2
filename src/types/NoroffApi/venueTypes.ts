import { Media, Owner, MetaVenue, Location } from './shared'

export interface Venues {
  id: string
  name: string
  description: string
  media: Media[]
  price: number
  maxGuests: number
  rating: number
  created: string
  updated: string
  location: Location
  owner?: Owner
  bookings?: Booking[]
  meta: MetaVenue
  _count: {
    bookings: number
  }
}

export interface Booking {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  customer: Customer
}

export interface Customer {
  name: string
  email: string
  bio: string
  avatar: Media
  banner: Media
}
