import { ENDPOINTS } from '@/utils/constants/apiConstants'
import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ProfileResponse } from '@/types/NoroffApi/response/profileResponse'

interface fetchAllProfilesOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  bookings?: boolean
  venues?: boolean
}

/**
 * Fetches a list of user profiles from the API with optional sorting, pagination, and inclusion of related bookings or venues.
 *
 * @param {fetchAllProfilesOptions} [options] - Options for fetching profiles.
 * @param {string} [options.sort='created'] - The field to sort the profiles by.
 * @param {string} [options.sortOrder='desc'] - The order to sort the profiles ('asc' or 'desc').
 * @param {number} [options.limit=10] - The maximum number of profiles to fetch per page.
 * @param {number} [options.page=1] - The page number to fetch.
 * @param {boolean} [options.bookings=false] - Whether to include bookings data in the profiles.
 * @param {boolean} [options.venues=false] - Whether to include venues data in the profiles.
 * @returns {Promise<{ profiles?: Profile[]; meta?: Meta; error?: ApiErrorResponse }>} An object containing the profiles, meta information, or an error message.
 * @throws Will throw an error if the fetch operation fails unexpectedly.
 *
 * @example
 * ```typescript
 * const { profiles, meta } = await fetchAllProfiles({
 *   sort: 'name',
 *   sortOrder: 'asc',
 *   limit: 5,
 *   page: 1,
 *   bookings: true,
 *   venues: true,
 * })
 * console.log('Fetched profiles:', profiles)
 * console.log('Metadata:', meta)
 * ```
 */
export default async function fetchAllProfiles({
  sort = 'created',
  sortOrder = 'desc',
  limit = 10,
  page = 1,
  bookings = false,
  venues = false,
}: fetchAllProfilesOptions = {}) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())

    if (bookings) queryParams.append('_bookings', 'true')
    if (venues) queryParams.append('_venues', 'true')

    const url = `${ENDPOINTS.getProfiles}?${queryParams.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch profiles',
      }

      return { error: errorMessage }
    }

    const data: ProfileResponse = await response.json()
    return { profiles: data.data, meta: data.meta }
  } catch (error) {
    throw error
  }
}
