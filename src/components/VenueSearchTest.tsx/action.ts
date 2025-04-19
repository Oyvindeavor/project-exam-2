'use server'

import searchVenues from '@/utils/api/venues/searchVenues'

export async function searchVenuesAction(prevState: unknown, formData: FormData) {
  const query = formData.get('q') as string
  if (!query) return { venues: [], query: '', message: 'No query provided' }

  try {
    const { venues } = await searchVenues(query)
    return { venues, query, message: null }
  } catch {
    return { venues: [], query, message: 'Failed to fetch venues' }
  }
}
