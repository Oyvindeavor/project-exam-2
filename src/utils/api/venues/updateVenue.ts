import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type {
  UpdateVenueRequest,
  UpdateVenueResponse,
} from '@/types/NoroffApi/response/venuesResponse'
import { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

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
