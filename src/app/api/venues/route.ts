import { type NextRequest, NextResponse } from 'next/server'
import fetchAllVenues from '@/utils/api/venues/fetchAllVenues'
import searchVenues from '@/utils/api/venues/searchVenues'
import type { Venues } from '@/types/NoroffApi/venueTypes'
import type { Meta } from '@/types/NoroffApi/shared'

export async function GET(request: NextRequest) {
  // Extract search params
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('q')?.trim() || ''
  const sort = searchParams.get('sort') || 'created'
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc'
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const _owner = searchParams.get('_owner') === 'true'
  const _bookings = searchParams.get('_bookings') === 'true'

  const validatedLimit = isNaN(limit) || limit <= 0 ? 10 : limit
  const validatedPage = isNaN(page) || page <= 0 ? 1 : page

  const isSearch = query.length > 0

  try {
    let response: { venues: Venues[]; meta: Meta | null } | null = null

    // fetching search function if query is present (it wont allow empty queries)
    if (isSearch) {
      const searchResponse: { venues: Venues[]; meta: Meta | null } = await searchVenues(query, {
        sort,
        sortOrder,
        limit: validatedLimit,
        page: validatedPage,
        _owner,
        _bookings,
      })
      response = { venues: searchResponse.venues, meta: searchResponse.meta }
      // fetching all venues if no query is present
    } else {
      const fetchResponse = await fetchAllVenues({
        sort,
        sortOrder,
        limit: validatedLimit,
        page: validatedPage,
        _owner,
        _bookings,
      })
      response = {
        venues: fetchResponse.venues?.data ?? fetchResponse.venues ?? [],
        meta: fetchResponse.meta ?? null,
      }
    }

    let venuesData: Venues[] = []
    let metaData: Meta | null = null

    if (response && response.venues && Array.isArray(response.venues)) {
      venuesData = response.venues
      metaData = response.meta
    } else {
      console.warn(`API Route: Unexpected data structure from fetch function`, response)
    }

    return NextResponse.json({ venues: venuesData, meta: metaData })
  } catch (error) {
    console.error(`API Route Error (${isSearch ? 'search' : 'default'}):`, error)

    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to fetch venues' },
      { status: 500 }
    )
  }
}
