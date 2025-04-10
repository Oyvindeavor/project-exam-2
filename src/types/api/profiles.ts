import { Avatar, Banner, Media, MetaVenue, Location, Count } from './shared'

export interface Profile {
  name: string
  email: string
  bio: string
  avatar: Avatar
  banner: Banner
  venueManager: boolean
  venues?: Venues[]
  bookings?: Bookings[]
  _count: Count
}

// optional
interface Venues {
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
}

// optional
interface Bookings {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  venue: Venue
}

// belong to bookings
interface Venue {
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
  meta: MetaVenue
}
