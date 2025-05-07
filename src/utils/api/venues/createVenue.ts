import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { CreateVenueRequest } from '@/types/NoroffApi/response/venuesResponse'
import type { CreateVenueResponse } from '@/types/NoroffApi/response/venuesResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

export async function createVenue(
  venueData: CreateVenueRequest
): Promise<CreateVenueResponse | ApiErrorResponse> {
  const response = await fetch(ENDPOINTS.createVenue, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(venueData),
  })

  console.log(
    'Response status:',
    response.status,
    'Response URL:',
    response.url,
    'Response body:',
    response.body
  )

  if (!response.ok) {
    const errorResponse: NoroffApiError = await response.json()
    const errorMessage: ApiErrorResponse = {
      error: errorResponse.errors?.[0]?.message || 'Failed to create venue',
    }
    console.log('Error creating venue:', errorResponse.errors)
    console.log('Error message:', errorMessage)
    throw new Error(errorMessage.error)
  }

  const data = (await response.json()) as CreateVenueResponse
  return data
}
