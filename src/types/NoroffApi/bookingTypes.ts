import type { Media, Owner, Location, MetaVenue, Customer } from './shared'

export interface Bookings {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  venue?: Venue // optional
  customer?: Customer // optional
}

// venue optional parameter if you include _venue
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
  owner: Owner
  meta: MetaVenue
}
