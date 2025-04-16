import { getAuthHeaders } from '@/utils/getAuthHeaders'
import { ENDPOINTS } from '../constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { ProfileSingleResponse } from '@/types/NoroffApi/response/profileResponse'

export default async function fetchProfileByName(name: string) {
  const response = await fetch(ENDPOINTS.getProfileByName(name), {
    method: 'GET',
    headers: await getAuthHeaders(),
  })

  if (!response.ok) {
    const errorResponse: NoroffApiError = await response.json()
    const errorMessage: ApiErrorResponse = {
      error: errorResponse.errors?.[0]?.message || 'Failed to fetch profile',
    }
    console.error('Error fetching profile:', errorResponse.errors)
    return { error: errorMessage }
  }

  const data: ProfileSingleResponse = await response.json()
  return { profile: data.data, meta: data.meta }
}
