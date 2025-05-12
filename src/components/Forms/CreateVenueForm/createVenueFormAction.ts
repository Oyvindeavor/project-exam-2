'use server'

import { createVenue } from '@/utils/api/venues/createVenue'
import type { CreateVenueRequest } from '@/types/NoroffApi/response/venuesResponse'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type ActionResult = {
  error?: string
}

/**
 * Server Action to handle the creation of a new venue form submission.
 *
 * @param prevState - The state from the previous execution of this action.
 * @param formData - The FormData object containing the submitted form values.
 * @returns Promise<ActionResult> - An object containing an error message if validation or API call fails.
 */
export default async function createVenueFormAction(
  prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get('name') as string | null
  const description = formData.get('description') as string | null
  const priceStr = formData.get('price') as string | null
  const maxGuestsStr = formData.get('maxGuests') as string | null
  const ratingStr = formData.get('rating') as string | null
  const wifi = formData.get('wifi') === 'on'
  const parking = formData.get('parking') === 'on'
  const breakfast = formData.get('breakfast') === 'on'
  const pets = formData.get('pets') === 'on'
  const address = formData.get('address') as string | null
  const city = formData.get('city') as string | null
  const zip = formData.get('zip') as string | null
  const country = formData.get('country') as string | null
  const continent = formData.get('continent') as string | null
  const latStr = formData.get('lat') as string | null
  const lngStr = formData.get('lng') as string | null

  // Validations
  if (!name?.trim()) {
    return { error: 'Venue name is required.' }
  }
  if (!description?.trim()) {
    return { error: 'Venue description is required.' }
  }
  if (!priceStr?.trim()) {
    return { error: 'Price per night is required.' }
  }
  if (!maxGuestsStr?.trim()) {
    return { error: 'Maximum number of guests is required.' }
  }

  // Detailed Validations

  let rating: number | undefined = undefined
  let lat: number | undefined = undefined
  let lng: number | undefined = undefined

  const price = parseFloat(priceStr)
  if (isNaN(price) || price < 0) {
    return { error: 'Price must be a valid non-negative number (e.g., 150.50 or 0).' }
  }

  const maxGuests = parseInt(maxGuestsStr, 10)
  if (isNaN(maxGuests) || maxGuests < 1) {
    return { error: 'Max Guests must be a valid whole number greater than 0.' }
  }

  if (ratingStr?.trim()) {
    rating = parseFloat(ratingStr)
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return { error: 'If provided, Rating must be a number between 0 and 5.' }
    }
  }

  if (latStr?.trim()) {
    lat = parseFloat(latStr)
    if (isNaN(lat) || lat < -90 || lat > 90) {
      return { error: 'If provided, Latitude must be a valid number between -90 and 90.' }
    }
  }

  if (lngStr?.trim()) {
    lng = parseFloat(lngStr)
    if (isNaN(lng) || lng < -180 || lng > 180) {
      return { error: 'If provided, Longitude must be a valid number between -180 and 180.' }
    }
  }

  const mediaPayload: { url: string; alt: string }[] = []
  for (let i = 0; i < 3; i++) {
    const mediaUrl = formData.get(`media[${i}][url]`) as string | null
    const mediaAlt = formData.get(`media[${i}][alt]`) as string | null

    if (mediaUrl?.trim()) {
      mediaPayload.push({
        url: mediaUrl.trim(),
        alt: mediaAlt?.trim() || `Image ${i + 1} for ${name.trim()}`,
      })
    } else if (mediaAlt?.trim() && !mediaUrl?.trim()) {
    }
  }

  const payload: CreateVenueRequest = {
    name: name.trim(),
    description: description.trim(),
    media: mediaPayload,
    price,
    maxGuests,
    rating,
    meta: {
      wifi,
      parking,
      breakfast,
      pets,
    },
    location: {
      address: address?.trim() || undefined,
      city: city?.trim() || undefined,
      zip: zip?.trim() || undefined,
      country: country?.trim() || undefined,
      continent: continent?.trim() || undefined,
      lat,
      lng,
    },
  }

  try {
    console.log('Attempting to create venue with payload:', JSON.stringify(payload, null, 2))
    const response = await createVenue(payload)
    console.log('Venue creation API response:', response)
    console.log('Venue created successfully!')
  } catch (error) {
    console.error('Server Action Error - Failed to create venue:', error)
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.'
    return { error: `Submission failed: ${message}` }
  }

  revalidatePath('/profile')
  redirect('/profile/venues')
}
