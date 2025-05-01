/**
 * Fetches the logged-in user's profile from the Noroff API.
 * This function is designed to be used ONLY in Server Components or Route Handlers
 * as it relies on `next/headers`.
 * It retrieves the user's name from cookies and constructs the API endpoint accordingly.
 * It also handles optional query parameters for including bookings and venues in the response.
 * The function caches the result to optimize performance.
 * Which means you can call this function in as many components as you want
 * and it will only fetch the data once.
 * to update the cache, you can use the `revalidateTag` function from `next/cache`eg when a user updates their profile.
 *
 * @param {Object} options - Options for fetching the profile.
 * @param {boolean} options.bookings - Whether to include bookings in the response.
 * @param {boolean} options.venues - Whether to include venues in the response.
 * @returns {Promise<{ profile?: Profile; error?: ApiErrorResponse }>}
 *         - The profile data if successful, or an error message if not.
 *
 * @throws {Error} If an unexpected error occurs during the fetch.
 *
 * @example getting the logged in user profile data
 * const { profile} = await fetchLoggedInUser({ bookings: true, venues: true });
 *
 *
 * @example using this function in multiple components
 * const { profile, error } = await fetchLoggedInUser();
 *
 *
 */

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
