// app/venues/lib/getVenuePageData.ts
import type { Venues } from '@/types/NoroffApi/venueTypes'
import type { Meta } from '@/types/NoroffApi/shared'

interface SearchParams {
  q?: string
  sort?: string
  sortOrder?: 'asc' | 'desc'
  limit?: string
  page?: string
  _owner?: string
  _bookings?: string
}

interface VenuePageData {
  venuesData: Venues[]
  metaData: Meta | null
  error: string | null
  query: string
  validatedPage: number
}

export async function getVenuePageData(searchParams: SearchParams): Promise<VenuePageData> {
  const query = searchParams.q?.trim() || ''
  const page = parseInt(searchParams.page || '1', 10)
  const validatedPage = isNaN(page) || page <= 0 ? 1 : page

  // Construct URLSearchParams to pass to the API route
  const apiParams = await new URLSearchParams()
  if (searchParams.q) apiParams.set('q', searchParams.q)
  if (searchParams.sort) apiParams.set('sort', searchParams.sort)
  if (searchParams.sortOrder) apiParams.set('sortOrder', searchParams.sortOrder)
  if (searchParams.limit) apiParams.set('limit', searchParams.limit)
  if (searchParams.page) apiParams.set('page', searchParams.page)
  if (searchParams._owner) apiParams.set('_owner', searchParams._owner)
  if (searchParams._bookings) apiParams.set('_bookings', searchParams._bookings)

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/venues?${apiParams.toString()}`

  let venuesData: Venues[] = []
  let metaData: Meta | null = null
  let error: string | null = null

  try {

    const response = await fetch(apiUrl, {
      method: 'GET',
      cache: 'no-store', // Ensure fresh data for initial load via API route
    })

    if (!response.ok) {
      // Try to parse error message from API route response
      let errorMessage = `API request failed with status ${response.status}`
      try {
        const errorBody = await response.json()
        errorMessage = errorBody.message || errorMessage
      } catch {
        /* ignore json parsing error */
      }
      throw new Error(errorMessage)
    }

    const data: { venues: Venues[]; meta: Meta | null } = await response.json()
    venuesData = data.venues || []
    metaData = data.meta || null
  } catch (err) {
    console.error('getVenuePageData Fetch Error:', err)
    error = err instanceof Error ? err.message : 'Failed to fetch initial venue data.'
    venuesData = []
    metaData = null
  }

  return {
    venuesData,
    metaData,
    error,
    query,
    validatedPage,
  }
}
