import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { CreateVenueRequest } from '@/types/NoroffApi/response/venuesResponse'
import type { CreateVenueResponse } from '@/types/NoroffApi/response/venuesResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

/**
 * Creates a new venue by sending a POST request to the API.
 *
 * @param venueData - The data for the venue to be created.
 * @returns A promise that resolves to the created venue response or an API error response.
 * @throws {Error} If the API request fails, throws an error with the error message.
 *
 * @example
 * ```typescript
 * const newVenueData = {
 *   name: 'New Venue',
 *   description: 'A great place for events',
 *   location: '123 Main St, City',
 *   capacity: 100,
 *   images: ['image1.jpg', 'image2.jpg'],
 *   tags: ['tag1', 'tag2'],
 *   owner: 'ownerId',
 *   bookings: [],
 * }
 *
 * const createdVenue = await createVenue(newVenueData)
 * console.log('Created Venue:', createdVenue)
 * * ```
 */
export async function createVenue(
  venueData: CreateVenueRequest
): Promise<CreateVenueResponse | ApiErrorResponse> {
  const response = await fetch(ENDPOINTS.createVenue, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(venueData),
  })

  if (!response.ok) {
    const errorResponse: NoroffApiError = await response.json()
    const errorMessage: ApiErrorResponse = {
      error: errorResponse.errors?.[0]?.message || 'Failed to create venue',
    }
    throw new Error(errorMessage.error)
  }

  const data = (await response.json()) as CreateVenueResponse
  return data
}
