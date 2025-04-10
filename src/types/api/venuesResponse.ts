import { Venues } from './venues'
import { Meta, Media } from './shared'

// /holidaze/venues Get all venues GET
export interface VenuesResponse {
  data: Venues[]
  meta: Meta
}

// /holidaze/venues/[id] Get a single venue by id GET
export interface VenuesResponseSingle {
  data: Venues
  meta: Meta
}

// /holidaze/venues POST Create a new venue
export interface CreateVenueRequest {
  name: string
  description: string
  media: Media[]
  price: number
  maxGuests: number
  rating?: number
  meta: {
    wifi?: boolean
    parking?: boolean
    breakfast?: boolean
    pets?: boolean
  }
  location: {
    address?: string
    city?: string
    zip?: string
    country?: string
    continent?: string
    lat?: number
    lng?: number
  }
}

export interface CreateVenueResponse {
  data: Venues
  meta: Meta
}

// /holidaze/venues/[id] PUT Update a venue by id
export interface UpdateVenueRequest {
  name?: string
  description?: string
  media?: Media[]
  price?: number
  maxGuests?: number
  rating?: number
  meta?: {
    wifi?: boolean
    parking?: boolean
    breakfast?: boolean
    pets?: boolean
  }
  location?: {
    address?: string
    city?: string
    zip?: string
    country?: string
    continent?: string
    lat?: number
    lng?: number
  }
}

export interface UpdateVenueResponse {
  data: Venues
  meta: Meta
}

// /holidaze/venues/[id] DELETE Delete a venue by id
export interface DeleteVenueResponse {
  data: Venues
  meta: Meta
}

// /holidaze/venues/search GET Search for venues
export interface SearchVenuesResponse {
  data: Venues[]
  meta: Meta
}
