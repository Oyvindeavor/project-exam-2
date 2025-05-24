import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { VenuesResponse } from '@/types/NoroffApi/response/venuesResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

interface fetchAllVenuesOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  _owner?: boolean
  _bookings?: boolean
  revalidate?: number
}

/**
 * Fetches a list of venues from the API with optional sorting, pagination, and inclusion of owner or bookings data.
 *
 * @param {fetchAllVenuesOptions} [options] - Options to customize the fetch request.
 * @param {string} [options.sort='created'] - The field to sort the venues by.
 * @param {string} [options.sortOrder='desc'] - The order to sort the venues ('asc' or 'desc').
 * @param {number} [options.limit=10] - The maximum number of venues to fetch per page.
 * @param {number} [options.page=1] - The page number to fetch.
 * @param {boolean} [options._owner=false] - Whether to include owner information in the response.
 * @param {boolean} [options._bookings=false] - Whether to include bookings information in the response.
 * @param {number} [options.revalidate] - Optional revalidation time for caching (if supported).
 * @returns {Promise<{ venues: VenuesResponse, meta: VenuesResponse['meta'] }>} An object containing the venues and metadata.
 * @throws {Error} Throws an error if the fetch fails or the API returns an error response.
 *
 * @example
 * const { venues, meta } = await fetchAllVenues({
 *   sort: 'name',
 *   sortOrder: 'asc',
 *   limit: 20,
 *   page: 2,
 *   _owner: true,
 *   _bookings: true,
 *   revalidate: 60,
 * })
 * console.log('Fetched venues:', venues)
 * console.log('Metadata:', meta)
 *
 * @example
 * const { venues, meta } = await fetchAllVenues({})
 * console.log('Fetched venues:', venues)
 * console.log('Metadata:', meta)
 *
 *
 */
export default async function fetchAllVenues({
  sort = 'created',
  sortOrder = 'desc',
  limit = 10,
  page = 1,
  _owner = false,
  _bookings = false,
  revalidate,
}: fetchAllVenuesOptions = {}) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())
    if (_owner) queryParams.append('_owner', 'true')
    if (_bookings) queryParams.append('_bookings', 'true')

    const url = `${ENDPOINTS.getVenues}?${queryParams.toString()}`

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
      console.error('Error fetching venues:', errorResponse.errors)
      throw new Error(errorMessage.error)
    }

    const data: VenuesResponse = await response.json()
    return { venues: data, meta: data.meta }
  } catch (error) {
    console.error('Error fetching venues:', error)
    throw error
  }
}
