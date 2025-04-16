import { getAuthHeaders } from '@/utils/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ProfileBookingsResponse } from '@/types/NoroffApi/response/profileResponse'

interface FetchBookingsOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  customer?: boolean
  venue?: boolean
}

export default async function fetchBookingsByProfile(
  name: string,
  {
    sort = 'created',
    sortOrder = 'desc',
    limit = 10,
    page = 1,
    customer = false,
    venue = false,
  }: FetchBookingsOptions = {}
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())

    if (customer) queryParams.append('_customer', 'true')
    if (venue) queryParams.append('_venue', 'true')

    const url = `${ENDPOINTS.getBookingsByProfile(name)}?${queryParams.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch bookings for profile',
      }
      console.error('Error fetching bookings:', errorResponse.errors)
      return { error: errorMessage }
    }

    const data: ProfileBookingsResponse = await response.json()
    return { bookings: data.data, meta: data.meta }
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }
}
