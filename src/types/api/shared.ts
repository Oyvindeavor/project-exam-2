export interface Media {
  url: string
  alt: string
}

export interface Meta {
  isFirstPage: boolean
  isLastPage: boolean
  currentPage: number
  previousPage: number
  nextPage: number
  pageCount: number
  totalCount: number
}

export interface Owner {
  name: string
  email: string
  bio: string
  avatar: Media
  banner: Media
}

export interface Location {
  address: string
  city: string
  zip: string
  country: string
  continent: string
  lat: number
  lng: number
}

export interface MetaVenue {
  wifi: boolean
  parking: boolean
  breakfast: boolean
  pets: boolean
}

export interface Count {
  venues: number
  bookings: number
}
