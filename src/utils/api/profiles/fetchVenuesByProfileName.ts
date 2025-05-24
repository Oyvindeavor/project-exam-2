import { ENDPOINTS } from '@/utils/constants/apiConstants'
import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ProfileVenuesResponse } from '@/types/NoroffApi/response/profileResponse'

interface FetchVenuesByProfileNameOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  owner?: boolean
  bookings?: boolean
}

/**
 * Fetches venues associated with a specific profile name, with optional sorting, pagination, and inclusion of owner or bookings data.
 *
 * @param name - The profile name to fetch venues for.
 * @param options - Optional parameters for fetching venues.
 * @param options.sort - The field to sort by (default: 'created').
 * @param options.sortOrder - The order to sort results ('asc' or 'desc', default: 'desc').
 * @param options.limit - The maximum number of venues to return per page (default: 10).
 * @param options.page - The page number to retrieve (default: 1).
 * @param options.owner - Whether to include owner information (default: false).
 * @param options.bookings - Whether to include bookings information (default: false).
 * @returns An object containing either the venues and meta information, or an error message.
 * @throws Will throw an error if the fetch operation fails or the API returns an error response.
 *
 * @example
 * ```typescript
 * const { venues, meta } = await fetchVenuesByProfileName('oyvind', {
 *   sort: 'name',
 *   sortOrder: 'asc',
 *   limit: 5,
 *   page: 1,
 *   owner: true,
 *   bookings: true,
 * })
 * console.log('Fetched venues:', venues)
 * console.log('Metadata:', meta)
 * ```
 */
export default async function fetchVenuesByProfileName(
  name: string,
  {
    sort = 'created',
    sortOrder = 'desc',
    limit = 10,
    page = 1,
    owner = false,
    bookings = false,
  }: FetchVenuesByProfileNameOptions = {}
) {
  const queryParams: URLSearchParams = new URLSearchParams()
  queryParams.append('sort', sort)
  queryParams.append('sortOrder', sortOrder)
  queryParams.append('limit', limit.toString())
  queryParams.append('page', page.toString())

  if (owner) queryParams.append('_owner', 'true')
  if (bookings) queryParams.append('_bookings', 'true')

  const url = `${ENDPOINTS.getVenuesByProfileName(name)}?${queryParams.toString()}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch venues',
      }
      return { error: errorMessage }
    }

    const data: ProfileVenuesResponse = await response.json()
    return { venues: data.data, meta: data.meta }
  } catch (error) {
    console.error('Network error:', error)
    return { error: { error: 'An unexpected error occurred while fetching venues' } }
  }
}
