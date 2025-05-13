import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { VenuesResponseSingle } from '@/types/NoroffApi/response/venuesResponse'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

interface FetchVenueByIdOptions {
  _owner?: boolean
  _bookings?: boolean
  token?: string
}

function parseJwt(token: string) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    return payload
  } catch {
    return null
  }
}

export default async function fetchVenueById(
  id: string,
  { _owner = false, _bookings = false, token }: FetchVenueByIdOptions = {}
) {
  try {
    const queryParams = new URLSearchParams()
    if (_owner) queryParams.append('_owner', 'true')
    if (_bookings) queryParams.append('_bookings', 'true')

    const url = `${ENDPOINTS.getVenueById(id)}?${queryParams.toString()}`

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      const errorResponse: NoroffApiError = await response.json()
      const errorMessage: ApiErrorResponse = {
        error: errorResponse.errors?.[0]?.message || 'Failed to fetch venue',
      }
      console.log('Error fetching venue:', errorResponse.errors)
      return { error: errorMessage.error }
    }

    const data: VenuesResponseSingle = await response.json()
    const venue = data.data

    if (_owner && token) {
      const user = parseJwt(token)
      const userEmail = user?.email

      if (!userEmail) {
        throw new Error('Invalid token: email missing')
      }

      if (venue?.owner?.email !== userEmail) {
        throw new Error('Unauthorized: You do not own this venue')
      }
    }

    return { venue, meta: data.meta }
  } catch (error) {
    console.log('Error fetching venue:', error)
    throw error
  }
}
