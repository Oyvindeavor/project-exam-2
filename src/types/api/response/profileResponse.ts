import { Meta, Media } from '../shared'
import { Profile } from '../profileTypes'
import { Bookings } from '../bookingTypes'
import { Venues } from '../venueTypes'

// /holidaze/profiles Get all profiles
export interface ProfileResponse {
  data: Profile[]
  meta: Meta
}

// /holidaze/profiles/[name] Get a single profile by name
export interface ProfileSingleResponse {
  data: Profile
  meta: Meta
}

// /holidaze/profiles/[name]/bookings Get all bookings for a profile
// Response is the same as the bookings in bookings.ts
export interface ProfileBookingsResponse {
  data: Bookings[]
  meta: Meta
}

// /holidaze/profiles/[name]/venues Get all venues for a profile
// Response is the same as the venues in venues.ts
export interface ProfileVenuesResponse {
  data: Venues[]
  meta: Meta
}

// /holidaze/profiles/[name] PUT update a profile
export interface UpdateProfileRequest {
  bio?: string
  avatar?: Media
  banner?: Media
  venueManager?: boolean
}

// the returned response on a succesful update
export interface UpdateProfileResponse {
  data: UpdatedProfile
  meta: Meta
}

export interface UpdatedProfile {
  name: string
  email: string
  bio: string
  avatar: Media
  banner: Media
  venueManager: boolean
}

// / /holidaze/profiles/search?q=[query] search profile by name or bio
export interface SearchProfileResponse {
  data: Profile[]
  meta: Meta
}
