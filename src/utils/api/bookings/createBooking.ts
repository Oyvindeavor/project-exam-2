import { getAuthHeaders } from '@/utils/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type {
  CreateBookingRequest,
  CreateBookingResponse,
} from '@/types/NoroffApi/response/bookingsResponse'

export default async function createBooking(
  bookingData: CreateBookingRequest
): Promise<CreateBookingResponse | ApiErrorResponse> {
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
      console.error('Error creating booking:', errorResponse.errors)
      return errorMessage
    } else {
      const data: CreateBookingResponse = await response.json()
      return data
    }
  } catch (error) {
    console.error('Error creating booking:', error)
    return { error: 'An unexpected error occurred' }
  }
}
