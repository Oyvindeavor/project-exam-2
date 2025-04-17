import { Media, MetaVenue, Location, Count, Owner, Customer } from './shared'

export interface Profile {
  name: string
  email: string
  bio: string
  avatar: Media
  banner: Media
  venueManager: boolean
  venues?: Venues[]
  bookings?: Bookings[]
  _count: Count
}

// optional paramet you can pass
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
  meta: MetaVenue
  location: Location
  owner?: Owner
  bookings?: Bookings[]
  _count: {
    bookings: number
  }
}

// optional parameter you can pass
export interface Bookings {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  customer: Customer
  venue: Venue
  _count: {
    bookings: number
  }
}

export interface Venue {
  id: string
  name: string
  description: string
  media: Media[]
  price: number
  maxGuests: number
  rating: number
  created: string
  updated: string
  meta: MetaVenue
  location: Location
  owner: Owner
  _count: {
    bookings: number
  }
  customer: Customer
}
