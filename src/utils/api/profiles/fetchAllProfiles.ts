import { ENDPOINTS } from '@/utils/constants/apiConstants'
import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ProfileResponse } from '@/types/NoroffApi/response/profileResponse'

interface fetchAllProfilesOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  bookings?: boolean
  venues?: boolean
}

export default async function fetchAllProfiles({
  sort = 'created',
  sortOrder = 'desc',
  limit = 10,
  page = 1,
  bookings = false,
  venues = false,
}: fetchAllProfilesOptions = {}) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())

    if (bookings) queryParams.append('_bookings', 'true')
    if (venues) queryParams.append('_venues', 'true')

    const url = `${ENDPOINTS.getProfiles}?${queryParams.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch profiles',
      }
      console.log('Error fetching profiles:', errorResponse.errors)
      console.log('Error message:', errorMessage)
      return { error: errorMessage }
    }

    const data: ProfileResponse = await response.json()
    return { profiles: data.data, meta: data.meta }
  } catch (error) {
    console.log('Error fetching profiles:', error)
    throw error
  }
}
