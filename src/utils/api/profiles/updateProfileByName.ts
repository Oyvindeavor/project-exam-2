import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type {
  UpdateProfileResponse,
  UpdateProfileRequest,
} from '@/types/NoroffApi/response/profileResponse'
import { revalidateTag } from 'next/cache'

/**
 * Updates a user profile by name using a PUT request.
 * This function sends the updated profile data to the API and handles the response.
 * If the request is successful, it returns the updated profile data.
 * If the request fails, it returns an error message.
 * It also revalidates the 'logged-in-user' cache tag to ensure that the latest user data is refetched
 * to update the UI accordingly.
 *
 * @param name - The name of the profile to update.
 * @param data - The profile data to update.
 * @returns A promise that resolves to the updated profile response or an API error response.
 *
 * @throws Will throw an error if the request fails unexpectedly.
 *
 * @example
 * ```typescript
 * const response = await updateProfileByName('john_doe', { bio: 'New bio' });
 * if ('error' in response) {
 *   // handle error
 * } else {
 *   // handle success
 * }
 * ```
 */
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
      return errorMessage
    }

    revalidateTag('logged-in-user') // refetches the logged-in user data
    const updatedData: UpdateProfileResponse = await response.json()
    return updatedData
  } catch (error) {
    throw error
  }
}
