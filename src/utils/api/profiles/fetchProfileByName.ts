import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '../../constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { ProfileSingleResponse } from '@/types/NoroffApi/response/profileResponse'

interface fetchProfileByNameOptions {
  bookings?: boolean
  venues?: boolean
}

/**
 * Fetches a user profile by name from the API, with optional inclusion of bookings and venues.
 *
 * @param name - The name of the profile to fetch.
 * @param options - Optional settings to include bookings and/or venues in the response.
 * @param options.bookings - Whether to include bookings in the profile data. Defaults to false.
 * @param options.venues - Whether to include venues in the profile data. Defaults to false.
 * @returns An object containing the profile data and meta information if successful,
 *          or an error object if the request fails.
 *
 * @example
 * ```typescript
 * const { profile, meta, error } = await fetchProfileByName('oyvind', { bookings: true });
 * ```
 */
export default async function fetchProfileByName(
  name: string,
  { bookings = false, venues = false }: fetchProfileByNameOptions = {
    bookings: false,
    venues: false,
  }
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    if (bookings) queryParams.append('_bookings', 'true')
    if (venues) queryParams.append('_venues', 'true')

    const url = `${ENDPOINTS.getProfileByName(name)}?${queryParams.toString()}`
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch profile',
      }
      return { error: errorMessage }
    }

    const data: ProfileSingleResponse = await response.json()
    return { profile: data.data, meta: data.meta }
  } catch (error) {
    console.error('Network error:', error)
    return { error: { error: 'An unexpected error occurred' } }
  }
}
