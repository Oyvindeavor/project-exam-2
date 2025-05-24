import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { SearchProfileResponse } from '@/types/NoroffApi/response/profileResponse'

interface SearchProfilesOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  bookings?: boolean
  venues?: boolean
}

/**
 * Searches for user profiles based on a query string and optional search parameters.
 * This function constructs a URL with the provided query and options, sends a GET request to the API,
 * and returns the list of profiles along with metadata. If the request fails, it returns an error message.
 *
 * @param query - The search query string to filter profiles.
 * @param options - Optional search parameters.
 * @param options.sort - The field to sort by (default: 'created').
 * @param options.sortOrder - The order of sorting, either 'asc' or 'desc' (default: 'desc').
 * @param options.limit - The maximum number of profiles to return per page (default: 10).
 * @param options.page - The page number for pagination (default: 1).
 * @param options.bookings - Whether to include bookings in the response (default: false).
 * @param options.venues - Whether to include venues in the response (default: false).
 * @returns An object containing the list of profiles and metadata, or an error message if the request fails.
 * @throws Will throw an error if the fetch operation fails unexpectedly.
 *
 * @example
 * ```typescript
 * const { profiles, meta } = await searchProfiles('john', {
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
 *
 */
export default async function searchProfiles(
  query: string,
  {
    sort = 'created',
    sortOrder = 'desc',
    limit = 10,
    page = 1,
    bookings = false,
    venues = false,
  }: SearchProfilesOptions = {}
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())

    if (bookings) queryParams.append('_bookings', 'true')
    if (venues) queryParams.append('_venues', 'true')
    const baseUrl = ENDPOINTS.searchProfiles(query)
    const url = `${baseUrl}&${queryParams.toString()}`

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

    const data: SearchProfileResponse = await response.json()
    return { profiles: data.data, meta: data.meta }
  } catch (error) {
    throw error
  }
}
