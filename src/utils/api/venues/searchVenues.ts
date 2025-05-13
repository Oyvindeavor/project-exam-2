import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { SearchVenuesResponse } from '@/types/NoroffApi/response/venuesResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

interface SearchVenuesOptions {
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  _owner?: boolean
  _bookings?: boolean
  revalidate?: number
}

export default async function searchVenues(
  query: string,
  {
    sort = 'created',
    sortOrder = 'desc',
    limit = 20,
    page = 1,
    _owner = false,
    _bookings = false,
    revalidate,
  }: SearchVenuesOptions = {}
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    queryParams.append('sort', sort)
    queryParams.append('sortOrder', sortOrder)
    queryParams.append('limit', limit.toString())
    queryParams.append('page', page.toString())
    if (_owner) queryParams.append('_owner', 'true')
    if (_bookings) queryParams.append('_bookings', 'true')
    const url = `${ENDPOINTS.searchVenues(query)}&${queryParams.toString()}`

    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (typeof revalidate === 'number') {
      fetchOptions.next = { revalidate }
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch venues',
      }
      console.log('Error fetching venues:', errorResponse.errors)
      console.log('Error message:', errorMessage)
      throw new Error(errorMessage.error)
    }

    const data: SearchVenuesResponse = await response.json()
    return { venues: data.data, meta: data.meta }
  } catch (error) {
    console.log('Error fetching venues:', error)
    throw error
  }
}
