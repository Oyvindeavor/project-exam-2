import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type {
  UpdateVenueRequest,
  UpdateVenueResponse,
} from '@/types/NoroffApi/response/venuesResponse'
import { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

/**
 *  * @remarks
 * This function sends a PUT request to the API endpoint for updating a venue.
 * It requires the venue ID and the data to be updated. The function handles
 * the response and returns either the updated venue data or an error message.
 * If the request fails, it throws an error with the message from the API.
 * The function also handles the case where the API returns an error response
 * by extracting the error message from the response.
 * Updates a venue by its ID with the provided data.
 *
 * @param id - The unique identifier of the venue to update.
 * @param data - The data to update the venue with.
 * @returns A promise that resolves to the updated venue response or an API error response.
 * @throws Will throw an error if the request fails unexpectedly.
 *
 * @example
 * ```typescript
 * const updatedVenueData = {
 *   name: 'Updated Venue Name',
 *   description: 'Updated description of the venue',
 *   location: '456 New Address, City',
 *   capacity: 150,
 *   images: ['updatedImage1.jpg', 'updatedImage2.jpg'],
 *   tags: ['updatedTag1', 'updatedTag2'],
 *   owner: 'updatedOwnerId',
 *   bookings: [],
 * }
 *
 * const updatedVenue = await updateVenueById('12345', updatedVenueData)
 * console.log('Updated Venue:', updatedVenue)
 * ```
 *
 */
export default async function updateVenueById(
  id: string,
  data: UpdateVenueRequest
): Promise<UpdateVenueResponse | ApiErrorResponse> {
  try {
    const url = ENDPOINTS.updateVenueById(id)

    const response = await fetch(url, {
      method: 'PUT',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to update venue',
      }
      return errorMessage
    }

    const updatedData: UpdateVenueResponse = await response.json()
    return updatedData
  } catch (error) {
    throw error
  }
}
