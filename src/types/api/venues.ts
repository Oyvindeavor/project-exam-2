import { Media, Owner, MetaVenue, Avatar, Banner, Meta } from './shared'

export interface VenuesResponse {
  data: Venues
  meta: Meta
}

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
}

interface Booking {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  customer: Customer
}

interface Customer {
  name: string
  email: string
  bio: string
  avatar: Avatar
  banner: Banner
}
