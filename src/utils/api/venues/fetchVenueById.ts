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

/**
 * Fetches a venue by its ID from the API, with optional inclusion of owner and bookings data.
 *
 * @param id - The unique identifier of the venue to fetch.
 * @param options - Optional parameters for the request.
 * @param options._owner - If true, includes owner information in the response. Defaults to false.
 * @param options._bookings - If true, includes bookings information in the response. Defaults to false.
 * @param options.token - Optional bearer token for authentication.
 * @returns An object containing the venue data and meta information, or an error message if the request fails.
 * @throws Will throw an error if the token is invalid, the user is unauthorized, or if the fetch operation fails.
 *
 * @example
 * ```typescript
 * const { venue, meta } = await fetchVenueById('12345', {
 *   _owner: true,
 *   _bookings: true,
 *   token
 * })
 * console.log('Fetched venue:', venue)
 * console.log('Metadata:', meta)
 * ```
 */
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
    throw error
  }
}
