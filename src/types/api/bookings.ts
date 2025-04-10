import type { Media, Avatar, Banner, Meta, Owner, Location, MetaVenue } from './shared'

export interface BookingsResponse {
  data: Booking
  meta: Meta
}

export interface Booking {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  venue?: venue // optional
  customer?: customer // optional
}

// venue optional parameter if you include _venue
interface venue {
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
  owner: Owner
  meta: MetaVenue
}

// customer (customer) _customer
interface customer {
  name: string
  email: string
  bio: string
  avatar: Avatar
  banner: Banner
}
