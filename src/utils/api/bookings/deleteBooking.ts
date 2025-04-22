import { getAuthHeaders } from '@/utils/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { DeleteBookingResponse } from '@/types/NoroffApi/response/bookingsResponse'

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
    console.error('Error deleting booking:', error)
    throw error
  }
}
