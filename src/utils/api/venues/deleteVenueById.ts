import { getAuthHeaders } from '@/utils/getAuthHeaders'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { NoroffApiError } from '@/types/NoroffApi/errorMessage'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

export default async function deleteVenueById(id: string) {
  const url = `${ENDPOINTS.deleteVenueById(id)}`

  const response = await fetch(url, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  })

  if (!response.ok) {
    const errorResponse: NoroffApiError = await response.json()
    const errorMessage: ApiErrorResponse = {
      error: errorResponse.errors?.[0]?.message || 'Failed to fetch venues',
    }
    console.error('Error fetching venues:', errorResponse.errors)
    console.log('Error message:', errorMessage)
    throw new Error(errorMessage.error)
  }

  return console.log('Venue deleted successfully:')
}
