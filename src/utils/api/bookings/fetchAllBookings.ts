import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { BookingsResponse } from '@/types/NoroffApi/response/bookingsResponse'

interface fetchAllBookingsOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  _customer?: boolean
  _venue?: boolean
}

/**
 * Fetches a paginated list of bookings from the API with optional sorting and population of related data.
 *
 * @param {fetchAllBookingsOptions} [options] - Options for fetching bookings.
 * @param {string} [options.sort='created'] - Field to sort the bookings by.
 * @param {string} [options.sortOrder='desc'] - Order to sort the bookings ('asc' or 'desc').
 * @param {number} [options.limit=10] - Number of bookings to fetch per page.
 * @param {number} [options.page=1] - Page number to fetch.
 * @param {boolean} [options._customer=false] - Whether to include customer details in the response.
 * @param {boolean} [options._venue=false] - Whether to include venue details in the response.
 * @returns {Promise<{ data: BookingsResponse; meta: BookingsResponse['meta'] }>} An object containing the bookings data and metadata.
 * @throws {Error} Throws an error if the API request fails.
 *
 * @example
 * ```typescript
 * const { data, meta } = await fetchAllBookings({
 *   sort: 'date',
 *   sortOrder: 'asc',
 *   limit: 5,
 *   page: 1,
 *   _customer: true,
 *   _venue: true,
 * })
 * console.log('Fetched bookings:', data)
 * console.log('Metadata:', meta)
 * ```
 */
export default async function fetchAllBookings({
  sort = 'created',
  sortOrder = 'desc',
  limit = 10,
  page = 1,
  _customer = false,
  _venue = false,
}: fetchAllBookingsOptions = {}) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())
    if (_customer) queryParams.append('_customer', 'true')
    if (_venue) queryParams.append('_venue', 'true')
    const url = `${ENDPOINTS.getBookings}?${queryParams.toString()}`

    const authHeaders = await getAuthHeaders()
    const response = await fetch(url, {
      method: 'GET',
      headers: authHeaders,
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch bookings',
      }
      throw new Error(errorMessage.error)
    }

    const data: BookingsResponse = await response.json()
    return { data: data, meta: data.meta }
  } catch (error) {
    throw error
  }
}
