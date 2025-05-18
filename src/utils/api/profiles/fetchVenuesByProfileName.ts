import { ENDPOINTS } from '@/utils/constants/apiConstants'
import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ProfileVenuesResponse } from '@/types/NoroffApi/response/profileResponse'

interface FetchVenuesByProfileNameOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  owner?: boolean
  bookings?: boolean
}

export default async function fetchVenuesByProfileName(
  name: string,
  {
    sort = 'created',
    sortOrder = 'desc',
    limit = 10,
    page = 1,
    owner = false,
    bookings = false,
  }: FetchVenuesByProfileNameOptions = {}
) {
  const queryParams: URLSearchParams = new URLSearchParams()
  queryParams.append('sort', sort)
  queryParams.append('sortOrder', sortOrder)
  queryParams.append('limit', limit.toString())
  queryParams.append('page', page.toString())

  if (owner) queryParams.append('_owner', 'true')
  if (bookings) queryParams.append('_bookings', 'true')

  const url = `${ENDPOINTS.getVenuesByProfileName(name)}?${queryParams.toString()}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch venues',
      }
      return { error: errorMessage }
    }

    const data: ProfileVenuesResponse = await response.json()
    return { venues: data.data, meta: data.meta }
  } catch (error) {
    console.error('Network error:', error)
    return { error: { error: 'An unexpected error occurred while fetching venues' } }
  }
}
