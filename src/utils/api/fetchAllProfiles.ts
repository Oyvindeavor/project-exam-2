import { ENDPOINTS } from '@/utils/constants/apiConstants'
import { getAuthHeaders } from '@/utils/getAuthHeaders'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ProfileResponse } from '@/types/NoroffApi/response/profileResponse'

export default async function fetchAllProfiles() {
  try {
    const response = await fetch(`${ENDPOINTS.getProfiles}`, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch profiles',
      }
      console.error('Error fetching profiles:', errorResponse.errors)
      console.log('Error message:', errorMessage)
      return { error: errorMessage }
    }

    const data: ProfileResponse = await response.json()
    return { profiles: data.data, meta: data.meta }
  } catch (error) {
    console.error('Error fetching profiles:', error)
    throw error
  }
}
