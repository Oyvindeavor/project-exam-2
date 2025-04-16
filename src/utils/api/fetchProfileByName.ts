import { getAuthHeaders } from '@/utils/getAuthHeaders'
import { ENDPOINTS } from '../constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { ProfileSingleResponse } from '@/types/NoroffApi/response/profileResponse'

interface fetchProfileByNameOptions {
  bookings?: boolean
  venues?: boolean
}

export default async function fetchProfileByName(
  name: string,
  { bookings = false, venues = false }: fetchProfileByNameOptions = {
    bookings: false,
    venues: false,
  }
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    if (bookings) queryParams.append('_bookings', 'true')
    if (venues) queryParams.append('_venues', 'true')

    const url = `${ENDPOINTS.getProfileByName(name)}?${queryParams.toString()}`
    const response = await fetch(url, {
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
  } catch (error) {
    console.error('Unexpected error fetching profile:', error)
    return { error: { error: 'An unexpected error occurred' } }
  }
}
