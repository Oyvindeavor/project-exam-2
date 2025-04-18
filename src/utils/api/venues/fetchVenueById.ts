import { getAuthHeaders } from '@/utils/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { VenuesResponseSingle } from '@/types/NoroffApi/response/venuesResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

interface FetchVenueByIdOptions {
  _owner?: boolean
  _bookings?: boolean
}

export default async function fetchVenueById(
  id: string,
  { _owner = false, _bookings = false }: FetchVenueByIdOptions = {}
) {
  try {
    const queryParams: URLSearchParams = new URLSearchParams()
    if (_owner) queryParams.append('_owner', 'true')
    if (_bookings) queryParams.append('_bookings', 'true')
    const url = `${ENDPOINTS.getVenueById(id)}?${queryParams.toString()}`
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch venue',
      }
      console.error('Error fetching venue:', errorResponse.errors)
      console.log('Error message:', errorMessage)
      throw new Error(errorMessage.error)
    }

    const data: VenuesResponseSingle = await response.json()
    return { venue: data.data, meta: data.meta }
  } catch (error) {
    console.error('Error fetching venue:', error)
    throw error
  }
}
