import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { SearchProfileResponse } from '@/types/NoroffApi/response/profileResponse'

interface SearchProfilesOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  bookings?: boolean
  venues?: boolean
}

export default async function searchProfiles(
  query: string,
  {
    sort = 'created',
    sortOrder = 'desc',
    limit = 10,
    page = 1,
    bookings = false,
    venues = false,
  }: SearchProfilesOptions = {}
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())

    if (bookings) queryParams.append('_bookings', 'true')
    if (venues) queryParams.append('_venues', 'true')
    const baseUrl = ENDPOINTS.searchProfiles(query)
    const url = `${baseUrl}&${queryParams.toString()}`

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
      return { error: errorMessage }
    }

    const data: SearchProfileResponse = await response.json()
    console.log('Data:', data)
    return { profiles: data.data, meta: data.meta }
  } catch (error) {
    console.log('Error fetching profiles:', error)
    throw error
  }
}
