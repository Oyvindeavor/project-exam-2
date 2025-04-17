import { getAuthHeaders } from '@/utils/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type {
  UpdateProfileResponse,
  UpdateProfileRequest,
} from '@/types/NoroffApi/response/profileResponse'

export default async function updateProfileByName(
  name: string,
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse | ApiErrorResponse> {
  try {
    const url = ENDPOINTS.updateProfileByName(name)

    const response = await fetch(url, {
      method: 'PUT',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to update profile',
      }
      console.error('Error updating profile:', errorResponse.errors)
      return errorMessage
    }

    const updatedData: UpdateProfileResponse = await response.json()
    return updatedData
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}
