import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import { cookies } from 'next/headers'
import type {
  CreateBookingRequest,
  CreateBookingResponse,
} from '@/types/NoroffApi/response/bookingsResponse'

/**
 * Creates a new booking by sending a POST request to the booking API endpoint.
 *
 * This function checks if the current user is a venue manager (by inspecting cookies).
 * Venue managers are not allowed to create bookings and will receive an error response.
 * For other users, it attempts to create a booking with the provided booking data.
 *
 * @param bookingData - The booking details to be sent in the request body.
 * @returns A promise that resolves to either a successful booking response or an error response.
 *
 * @remarks
 * - Requires authentication headers, which are retrieved via `getAuthHeaders()`.
 * - Handles both API and network errors.
 * - Returns a specific error if the user is a venue manager.
 *
 * @throws {ApiErrorResponse} If the API returns an error response.
 * @throws {NoroffApiError} If the API returns a Noroff-specific error.
 * @throws {Error} If a network error occurs.
 *
 * @example
 * ```typescript
 * const bookingData: CreateBookingRequest = {
 *   // ... booking details
 * }
 * createBooking(bookingData)
 *   .then(response => {
 *     if ('error' in response) {
 *       console.error('Error creating booking:', response.error)
 *     } else {
 *       console.log('Booking created successfully:', response)
 *     }
 *   })
 *   .catch(error => {
 *     console.error('Unexpected error:', error)
 *   })
 * ```
 */
export default async function createBooking(
  bookingData: CreateBookingRequest
): Promise<CreateBookingResponse | ApiErrorResponse> {
  const cookieStore = await cookies()
  const venueManager = cookieStore.get('venueManager')?.value === 'true'

  if (venueManager) {
    return { error: 'Venue managers cannot create bookings' }
  }

  try {
    const response = await fetch(ENDPOINTS.createBooking, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to create booking',
      }
      return errorMessage
    } else {
      const data: CreateBookingResponse = await response.json()
      return data
    }
  } catch (error) {
    console.error('Network error:', error)
    return { error: 'An unexpected error occurred' }
  }
}
