import { cache } from 'react'
import { cookies } from 'next/headers'
import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { ProfileSingleResponse } from '@/types/NoroffApi/response/profileResponse'

interface fetchProfileByNameOptions {
  bookings?: boolean
  venues?: boolean
}

/**
 * Fetches the currently logged-in user's profile using the username stored in cookies.
 * Optionally includes bookings and/or venues in the response. The function is cached for performance.
 * It uses the `cache` function from React to optimize performance by caching the result.
 * To update the cache, you can use the `revalidate` with the tag 'logged-in-user'.
 * eg when a user updates their profile, you can call `revalidateTag('logged-in-user')` to refresh the cache.
 *
 * @param options - Options to include bookings and/or venues in the profile response.
 * @param options.bookings - If true, includes the user's bookings in the response.
 * @param options.venues - If true, includes the user's venues in the response.
 * @returns An object containing either the user's profile and meta information, or an error object.
 * @throws Will throw an error if the fetch operation fails or if the API returns an error response.
 *
 *
 * @example
 * const { profile, meta, error } = await fetchLoggedInUser({ bookings: true, venues: false });
 */
export const fetchLoggedInUser = cache(
  async ({ bookings = false, venues = false }: fetchProfileByNameOptions = {}) => {
    try {
      // Get the name from cookies
      const cookieStore = await cookies()
      const name = cookieStore.get('name')?.value || ''
      if (!name) return { error: { error: 'No user name in cookies' } }

      const queryParams = new URLSearchParams()
      if (bookings) queryParams.append('_bookings', 'true')
      if (venues) queryParams.append('_venues', 'true')

      // use the name from cookies to fetch the profile
      const url = `${ENDPOINTS.getProfileByName(name)}?${queryParams.toString()}`

      const response = await fetch(url, {
        method: 'GET',
        headers: await getAuthHeaders(),
        next: {
          tags: ['logged-in-user'],
        },
      })

      if (!response.ok) {
        const errorResponse: NoroffApiError = await response.json()
        const errorMessage: ApiErrorResponse = {
          error: errorResponse.errors?.[0]?.message || 'Failed to fetch profile',
        }
        console.error('Error fetching profile:', errorResponse.errors)
        return { error: errorMessage }
      }

      const data: ProfileSingleResponse = await response.json()
      return { profile: data.data, meta: data.meta }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error)
      return { error: { error: 'An unexpected error occurred' } }
    }
  }
)
