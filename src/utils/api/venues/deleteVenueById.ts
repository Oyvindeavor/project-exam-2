import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

/**
 * Deletes a venue by its unique identifier.
 *
 * Sends a DELETE request to the API endpoint for the specified venue ID.
 * Throws an error if the request fails.
 *
 * @param id - The unique identifier of the venue to delete.
 * @throws {Error} If the API response is not OK, throws an error with the message from the API.
 *
 * @example
 * ```typescript
 * const venueId = '12345'
 * await deleteVenueById(venueId)
 * console.log('Venue deleted successfully')
 * ```
 */

export default async function deleteVenueById(id: string) {
  const url = `${ENDPOINTS.deleteVenueById(id)}`

  const response = await fetch(url, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  })

  if (!response.ok) {
    const errorResponse: NoroffApiError = await response.json()
    const errorMessage: ApiErrorResponse = {
      error: errorResponse.errors?.[0]?.message || 'Failed to fetch venues',
    }
    throw new Error(errorMessage.error)
  }
}
