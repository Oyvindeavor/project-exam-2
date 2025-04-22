import { getAuthHeaders } from '@/utils/auth/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'
import type { BookingsResponse } from '@/types/NoroffApi/response/bookingsResponse'

interface fetchAllBookingsOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  _customer?: boolean
  _venue?: boolean
}

export default async function fetchAllBookings({
  sort = 'created',
  sortOrder = 'desc',
  limit = 10,
  page = 1,
  _customer = false,
  _venue = false,
}: fetchAllBookingsOptions = {}) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())
    if (_customer) queryParams.append('_customer', 'true')
    if (_venue) queryParams.append('_venue', 'true')
    const url = `${ENDPOINTS.getBookings}?${queryParams.toString()}`

    const authHeaders = await getAuthHeaders()
    const response = await fetch(url, {
      method: 'GET',
      headers: authHeaders,
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch bookings',
      }
      console.log('Error fetching bookings:', errorResponse.errors)
      console.log('Error message:', errorMessage)
      throw new Error(errorMessage.error)
    }

    const data: BookingsResponse = await response.json()
    return { data: data, meta: data.meta }
  } catch (error) {
    console.log('Error fetching bookings:', error)
    throw error
  }
}
