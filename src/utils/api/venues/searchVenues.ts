import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { SearchVenuesResponse } from '@/types/NoroffApi/response/venuesResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

interface SearchVenuesOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  _owner?: boolean
  _bookings?: boolean
  revalidate?: number
}

/**
 * Searches for venues based on the provided query and options.
 *
 * @param query - The search query string to filter venues.
 * @param options - Optional parameters to customize the search.
 * @param options.sort - The field to sort the results by (default: 'created').
 * @param options.sortOrder - The order of sorting, either 'asc' or 'desc' (default: 'desc').
 * @param options.limit - The maximum number of venues to return per page (default: 20).
 * @param options.page - The page number for pagination (default: 1).
 * @param options._owner - Whether to include owner information in the response (default: false).
 * @param options._bookings - Whether to include booking information in the response (default: false).
 * @param options.revalidate - Optional revalidation time for caching, in seconds.
 * @returns An object containing the list of venues and metadata.
 * @throws Will throw an error if the fetch operation fails or the API returns an error response.
 *
 * @example
 * ```typescript
 * const { venues, meta } = await searchVenues('coffee shop', {
 *   sort: 'name',
 *   sortOrder: 'asc',
 *   limit: 10,
 *   page: 1,
 *   _owner: true,
 *   _bookings: true,
 *   revalidate: 60,
 * })
 * console.log('Fetched venues:', venues)
 * console.log('Metadata:', meta)
 * ```
 */
export default async function searchVenues(
  query: string,
  {
    sort = 'created',
    sortOrder = 'desc',
    limit = 20,
    page = 1,
    _owner = false,
    _bookings = false,
    revalidate,
  }: SearchVenuesOptions = {}
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())
    if (_owner) queryParams.append('_owner', 'true')
    if (_bookings) queryParams.append('_bookings', 'true')
    const url = `${ENDPOINTS.searchVenues(query)}&${queryParams.toString()}`

    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (typeof revalidate === 'number') {
      fetchOptions.next = { revalidate }
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch venues',
      }
      throw new Error(errorMessage.error)
    }

    const data: SearchVenuesResponse = await response.json()
    return { venues: data.data, meta: data.meta }
  } catch (error) {
    throw error
  }
}
