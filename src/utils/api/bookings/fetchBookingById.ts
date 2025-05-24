import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { BookingSingleResponse } from '@/types/NoroffApi/response/bookingsResponse'

interface fetchBookingByIdOptions {
  _customer?: boolean
  _venue?: boolean
}

type BookingByIdResult =
  | { data: BookingSingleResponse['data']; meta: BookingSingleResponse['meta']; error: null }
  | { data: null; meta: null; error: string }

/**
 * Fetches a booking by its ID from the API, with optional inclusion of customer and venue details.
 *
 * @param id - The unique identifier of the booking to fetch.
 * @param options - Optional parameters to include related customer and venue data.
 * @param options._customer - If true, includes customer details in the response.
 * @param options._venue - If true, includes venue details in the response.
 * @returns A promise that resolves to an object containing the booking data, meta information, and any error encountered.
 *
 * @example
 * ```typescript
 * const result = await fetchBookingById('booking123', { _customer: true, _venue: false });
 * if (result.error) {
 *   // handle error
 * } else {
 *   // access result.data and result.meta
 * }
 * ```
 */
export default async function fetchBookingById(
  id: string,
  { _customer = false, _venue = false }: fetchBookingByIdOptions = {}
): Promise<BookingByIdResult> {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    if (_customer) queryParams.append('_customer', 'true')
    if (_venue) queryParams.append('_venue', 'true')
    const url = `${ENDPOINTS.getBookingById(id)}?${queryParams.toString()}`

    const authHeaders = await getAuthHeaders()
    const response = await fetch(url, {
      method: 'GET',
      headers: authHeaders,
    })

    const json = await response.json()

    if (!response.ok) {
      const errorResponse = json as NoroffApiError
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch booking',
      }
      return {
        data: null,
        meta: null,
        error: errorMessage.error,
      }
    }

    const data = json as BookingSingleResponse
    return { data: data.data, meta: data.meta, error: null }
  } catch (err) {
    console.error('Network error:', err)
    return {
      data: null,
      meta: null,
      error: 'Something went wrong while fetching booking',
    }
  }
}
