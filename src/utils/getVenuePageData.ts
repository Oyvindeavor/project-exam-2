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

/**
 * Fetches venue page data from the API based on the provided search parameters.
 *
 * Constructs a query string from the given `searchParams`, sends a GET request to the `/api/venues` endpoint,
 * and returns the venues data, metadata, any error encountered, the search query, and the validated page number.
 *
 * @param searchParams - The parameters used to filter, sort, and paginate the venues.
 * @returns A promise that resolves to an object containing:
 *   - `venuesData`: An array of venues matching the search criteria.
 *   - `metaData`: Metadata about the venues result set (e.g., pagination info).
 *   - `error`: An error message if the request fails, otherwise `null`.
 *   - `query`: The trimmed search query string.
 *   - `validatedPage`: The validated page number (defaults to 1 if invalid).
 *
 * @throws Will not throw, but will return an error message in the result object if the fetch fails.
 *
 * @example
 * const searchParams = {
 *   q: 'wedding',
 *   sort: 'rating',
 *   sortOrder: 'desc',
 *   limit: '10',
 *   page: '1',
 *   _owner: 'true',
 *   _bookings: 'true',
 * }
 *
 * const { venuesData, metaData, error, query, validatedPage } = await getVenuePageData(searchParams)
 */
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
      cache: 'no-store',
    })

    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`
      try {
        const errorBody = await response.json()
        errorMessage = errorBody.message || errorMessage
      } catch {
        errorMessage = `API request failed with status ${response.status}`
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
