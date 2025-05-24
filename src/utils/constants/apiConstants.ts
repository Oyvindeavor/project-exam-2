/**
 * API Constants
 * This module contains constants and endpoints for the API used in the application.
 * It includes the base URL, API key, and various endpoints for authentication,
 * profiles, venues, and bookings.
 * The constants are derived from environment variables for flexibility and security.
 * The endpoints are constructed using the base URL and specific paths for each resource.
 * This allows for easy access and management of API endpoints throughout the application.
 * The API key is used for authentication and should be kept secure.
 * The base URL is the root URL for the API, and it can be configured for different environments (e.g., development, production).
 * The endpoints are organized by resource type, making it easy to find and use the appropriate endpoint for each API call.
 * The API key and base URL are loaded from environment variables to keep sensitive information out of the codebase.
 * This module is intended to be used in conjunction with other modules that handle API requests and responses.
 *
 */

export const API_KEY = process.env.EXTERNAL_API_KEY
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const BASE_URL_HOLIDAZE = `${BASE_URL}/holidaze`

/**
 * @example
 * ```typescript
 * import {endpoints} from '@/utils/constants/apiConstants'
 * import {getAuthHeaders} from '@/utils/auth/getAuthHeaders'
 *
 * const fetchVenues = async () => {
 *   const response = await fetch(endpoints.getVenues, {
 *     method: 'GET',
 *     headers: await getAuthHeaders(),
 *   })
 *   if (!response.ok) {
 *     throw new Error('Failed to fetch venues')
 *   }
 *   const data = await response.json()
 *   return data
 *  })
 *
 * const venues = await fetchVenues()
 * console.log(venues)
 * }
 */

export const ENDPOINTS = {
  // AUTH
  login: `${BASE_URL}/auth/login?_holidaze=true`, // Login endpoint Including the _holidaze optional parameter to get venue manager.
  register: `${BASE_URL}/auth/register`,

  // PROFILES
  getProfiles: `${BASE_URL_HOLIDAZE}/profiles`, // Retrieve all profiles.
  getProfileByName: (name: string) => `${BASE_URL_HOLIDAZE}/profiles/${name}`, // Get a profile by name.
  updateProfileByName: (name: string) => `${BASE_URL_HOLIDAZE}/profiles/${name}`, // Update a profile (bio, venue manager, etc.).
  searchProfiles: (query: string) => `${BASE_URL_HOLIDAZE}/profiles/search?q=${query}`, // Search for profiles.
  getVenuesByProfileName: (name: string) => `${BASE_URL_HOLIDAZE}/profiles/${name}/venues`, // Get venues for a profile.
  getBookingsByProfile: (name: string) => `${BASE_URL_HOLIDAZE}/profiles/${name}/bookings`, // Get bookings for a profile.

  // VENUES
  getVenues: `${BASE_URL_HOLIDAZE}/venues`, // Get all venues.
  createVenue: `${BASE_URL_HOLIDAZE}/venues`, // Create a venue.
  getVenueById: (id: string) => `${BASE_URL_HOLIDAZE}/venues/${id}`, // Get venue by ID.
  updateVenueById: (id: string) => `${BASE_URL_HOLIDAZE}/venues/${id}`, // Update venue by ID.
  deleteVenueById: (id: string) => `${BASE_URL_HOLIDAZE}/venues/${id}`, // Delete venue by ID.
  searchVenues: (query: string) => `${BASE_URL_HOLIDAZE}/venues/search?q=${query}`, // Search for venues.

  // BOOKINGS
  getBookings: `${BASE_URL_HOLIDAZE}/bookings`, // Get all bookings.
  getBookingById: (id: string) => `${BASE_URL_HOLIDAZE}/bookings/${id}`, // Get booking by ID.
  createBooking: `${BASE_URL_HOLIDAZE}/bookings`, // Create a booking.
  updateBookingById: (id: string) => `${BASE_URL_HOLIDAZE}/bookings/${id}`, // Update booking by ID.
  deleteBookingById: (id: string) => `${BASE_URL_HOLIDAZE}/bookings/${id}`, // Delete booking by ID.
}
