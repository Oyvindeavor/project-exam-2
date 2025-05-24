import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ProfileBookingsResponse } from '@/types/NoroffApi/response/profileResponse'

interface FetchBookingsOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  customer?: boolean
  venue?: boolean
}

/**
 * Fetches bookings associated with a specific profile name.
 *
 * @param name - The profile name to fetch bookings for.
 * @param options - Optional parameters to customize the fetch request.
 * @param options.sort - The field to sort the bookings by (default: 'created').
 * @param options.sortOrder - The order to sort the bookings ('asc' or 'desc', default: 'desc').
 * @param options.limit - The maximum number of bookings to return per page (default: 10).
 * @param options.page - The page number to fetch (default: 1).
 * @param options.customer - Whether to include customer details in the response (default: false).
 * @param options.venue - Whether to include venue details in the response (default: false).
 * @returns An object containing the bookings and meta information, or an error message if the request fails.
 * @throws Will throw an error if the fetch operation fails unexpectedly.
 *
 * @example
 * ```typescript
 * const { bookings, meta } = await fetchBookingsByProfile('oyvind', {
 *   sort: 'date',
 *   sortOrder: 'asc',
 *   limit: 5,
 *   page: 1,
 *   customer: true,
 *   venue: true,
 * })
 * console.log('Fetched bookings:', bookings)
 * console.log('Metadata:', meta)
 * ```
 */
export default async function fetchBookingsByProfile(
  name: string,
  {
    sort = 'created',
    sortOrder = 'desc',
    limit = 10,
    page = 1,
    customer = false,
    venue = false,
  }: FetchBookingsOptions = {}
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())

    if (customer) queryParams.append('_customer', 'true')
    if (venue) queryParams.append('_venue', 'true')

    const url = `${ENDPOINTS.getBookingsByProfile(name)}?${queryParams.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch bookings for profile',
      }
      return { error: errorMessage }
    }

    const data: ProfileBookingsResponse = await response.json()
    return { bookings: data.data, meta: data.meta }
  } catch (error) {
    throw error
  }
}
