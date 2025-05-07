import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type {
  UpdateProfileResponse,
  UpdateProfileRequest,
} from '@/types/NoroffApi/response/profileResponse'
import { revalidateTag } from 'next/cache'

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
      console.log('Error updating profile:', errorResponse.errors)
      return errorMessage
    }

    revalidateTag('logged-in-user') // refetches the logged-in user data
    const updatedData: UpdateProfileResponse = await response.json()
    return updatedData
  } catch (error) {
    console.log('Error updating profile:', error)
    throw error
  }
}
