import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { DeleteBookingResponse } from '@/types/NoroffApi/response/bookingsResponse'

/**
 * Deletes a booking by its ID.
 *
 * @param bookingId - The unique identifier of the booking to delete.
 * @returns A promise that resolves to a `DeleteBookingResponse` on success,
 *          or rejects with an `ApiErrorResponse` or `NoroffApiError` on failure.
 *
 * @throws {ApiErrorResponse | NoroffApiError} Throws an error if the deletion fails.
 *
 * @example
 * ```typescript
 * const bookingId = '12345'
 * try {
 *   const response = await deleteBooking(bookingId)
 *   console.log('Booking deleted successfully:', response)
 * } catch (error) {
 *   console.error('Error deleting booking:', error)
 * }
 * ```
 * ```
 * // Example of a successful response
 * {
 *   success: true,
 *   status: 204,
 * }
 * }
 * // Example of an error response
 * {
 *   error: 'Booking not found',
 *   status: 404,
 * }
 * }
 * ```
 */
export default async function deleteBooking(
  bookingId: string
): Promise<DeleteBookingResponse | ApiErrorResponse | NoroffApiError> {
  const url = ENDPOINTS.deleteBookingById(bookingId)

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw error
    }

    return {
      success: true,
      status: response.status,
    }
  } catch (error) {
    throw error
  }
}
