import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type {
  UpdateBookingRequest,
  UpdateBookingResponse,
} from '@/types/NoroffApi/response/bookingsResponse'

export default async function updateBooking(
  bookingId: string,
  bookingData: UpdateBookingRequest
): Promise<UpdateBookingResponse | ApiErrorResponse> {
  try {
    const response = await fetch(`${ENDPOINTS.updateBookingById(bookingId)}`, {
      method: 'PUT',
      headers: await getAuthHeaders(),
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to update booking',
      }
      return errorMessage
    } else {
      const data: UpdateBookingResponse = await response.json()
      return data
    }
  } catch (error) {
    console.error('Network error:', error)
    return { error: 'An unexpected error occurred' }
  }
}
