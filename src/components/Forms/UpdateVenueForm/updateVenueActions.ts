'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import updateVenueById from '@/utils/api/venues/updateVenue'
import type {
  UpdateVenueRequest,
  UpdateVenueResponse,
} from '@/types/NoroffApi/response/venuesResponse'
import type { Media as VenueMedia } from '@/types/NoroffApi/shared'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

export interface UpdateVenueFormState {
  message: string
  errors?: {
    name?: string
    description?: string
    media?: string
    price?: string
    maxGuests?: string
    rating?: string
    address?: string
    city?: string
    zip?: string
    country?: string
    continent?: string
    lat?: string
    lng?: string
    general?: string
  }
  fieldValues?: Partial<UpdateVenueRequest> // To repopulate the form
  success: boolean
}

export async function updateVenueAction(
  venueId: string,
  prevState: UpdateVenueFormState,
  formData: FormData
): Promise<UpdateVenueFormState> {
  console.log('Server Action Triggered (Simplified). Venue ID:', venueId)

  const errors: NonNullable<UpdateVenueFormState['errors']> = {}
  const fieldValues: Partial<UpdateVenueRequest> = {}

  // --- 1. Extract Data from FormData ---
  const name = formData.get('name') as string | null
  fieldValues.name = name ?? undefined

  const description = formData.get('description') as string | null
  fieldValues.description = description ?? undefined

  const priceStr = formData.get('price') as string | null

  fieldValues.price = priceStr ? parseFloat(priceStr) : undefined

  const maxGuestsStr = formData.get('maxGuests') as string | null

  fieldValues.maxGuests = maxGuestsStr ? parseInt(maxGuestsStr, 10) : undefined

  const ratingStr = formData.get('rating') as string | null

  fieldValues.rating = ratingStr ? parseFloat(ratingStr) : undefined

  const submittedMedia: VenueMedia[] = []
  for (let i = 0; i < 3; i++) {
    const url = formData.get(`media[${i}][url]`) as string | null
    const alt = formData.get(`media[${i}][alt]`) as string | null
    if (url?.trim()) {
      submittedMedia.push({ url: url.trim(), alt: alt?.trim() || `Image ${i + 1}` })
    }
  }
  fieldValues.media = submittedMedia

  fieldValues.meta = {
    wifi: formData.get('wifi') === 'on',
    parking: formData.get('parking') === 'on',
    breakfast: formData.get('breakfast') === 'on',
    pets: formData.get('pets') === 'on',
  }

  fieldValues.location = {
    address: (formData.get('address') as string | null) ?? undefined,
    city: (formData.get('city') as string | null) ?? undefined,
    zip: (formData.get('zip') as string | null) ?? undefined,
    country: (formData.get('country') as string | null) ?? undefined,
    continent: (formData.get('continent') as string | null) ?? undefined,
    lat: formData.get('lat') ? parseFloat(formData.get('lat') as string) : undefined,
    lng: formData.get('lng') ? parseFloat(formData.get('lng') as string) : undefined,
  }

  // --- 2. Perform Manual Validations ---
  if (!name?.trim()) {
    errors.name = 'Venue name is required.'
  }
  if (!description?.trim()) {
    errors.description = 'Venue description is required.'
  }

  let price: number | undefined
  if (!priceStr?.trim()) {
    errors.price = 'Price per night is required.'
  } else {
    price = parseFloat(priceStr)
    if (isNaN(price) || price < 0) {
      errors.price = 'Price must be a valid non-negative number.'
    }
  }

  let maxGuests: number | undefined
  if (!maxGuestsStr?.trim()) {
    errors.maxGuests = 'Maximum number of guests is required.'
  } else {
    maxGuests = parseInt(maxGuestsStr, 10)
    if (isNaN(maxGuests) || maxGuests < 1) {
      errors.maxGuests = 'Max Guests must be a valid whole number greater than 0.'
    }
  }

  let rating: number | undefined
  if (ratingStr?.trim()) {
    rating = parseFloat(ratingStr)
    if (isNaN(rating) || rating < 0 || rating > 5) {
      errors.rating = 'If provided, Rating must be a number between 0 and 5.'
    }
  }

  let lat: number | undefined
  const latStr = formData.get('lat') as string | null
  if (latStr?.trim()) {
    lat = parseFloat(latStr)
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.lat = 'If provided, Latitude must be a valid number between -90 and 90.'
    }
  }

  let lng: number | undefined
  const lngStr = formData.get('lng') as string | null
  if (lngStr?.trim()) {
    lng = parseFloat(lngStr)
    if (isNaN(lng) || lng < -180 || lng > 180) {
      errors.lng = 'If provided, Longitude must be a valid number between -180 and 180.'
    }
  }

  for (let i = 0; i < submittedMedia.length; i++) {
    if (
      !submittedMedia[i].url ||
      typeof submittedMedia[i].url !== 'string' ||
      !submittedMedia[i].url.startsWith('http')
    ) {
      if (!errors.media) errors.media = ''
      errors.media += `Invalid URL for Image ${i + 1}. Must start with http/https. `
    }
  }

  if (Object.keys(errors).length > 0) {
    console.error('Validation Failed (Manual):', errors)
    return {
      message: 'Validation failed. Please check the fields.',
      errors,
      fieldValues,
      success: false,
    }
  }

  const payload: UpdateVenueRequest = {
    name: name!,
    description: description!,
    media: submittedMedia,
    price: price!,
    maxGuests: maxGuests!,
    rating: rating,
    meta: fieldValues.meta,
    location: {
      ...fieldValues.location,
      lat: lat,
      lng: lng,
    },
  }

  if (payload.rating === undefined) delete payload.rating
  if (payload.location) {
    if (payload.location.address === undefined || payload.location.address === '')
      delete payload.location.address
    if (payload.location.city === undefined || payload.location.city === '')
      delete payload.location.city
    if (payload.location.zip === undefined || payload.location.zip === '')
      delete payload.location.zip
    if (payload.location.country === undefined || payload.location.country === '')
      delete payload.location.country
    if (payload.location.continent === undefined || payload.location.continent === '')
      delete payload.location.continent
    if (payload.location.lat === undefined) delete payload.location.lat
    if (payload.location.lng === undefined) delete payload.location.lng
  }

  try {
    console.log('Calling updateVenueById with ID:', venueId)
    console.log('Request Body (Validated Manually):', JSON.stringify(payload, null, 2))

    const result = await updateVenueById(venueId, payload)

    if (
      result &&
      typeof result === 'object' &&
      'error' in result &&
      (result as ApiErrorResponse).error
    ) {
      const errorResult = result as ApiErrorResponse
      const errorMessage =
        typeof errorResult.error === 'string'
          ? errorResult.error
          : JSON.stringify(errorResult.error)
      console.error('API Error updating venue:', errorMessage)
      return {
        message: `API Error: ${errorMessage}`,
        errors: { ...errors, general: errorMessage },
        fieldValues,
        success: false,
      }
    }

    const updatedData = result as UpdateVenueResponse
    console.log('Venue Updated Successfully (Manually Validated):', updatedData)

    revalidatePath('/profile/venues')
    revalidatePath(`/venue/${venueId}`)
    revalidatePath(`/profile/venues/edit/${venueId}`)
    revalidatePath('/venues')
  } catch (error) {
    console.error('Network or unexpected error during updateVenueById call:', error)
    let errorMessage = 'An unexpected error occurred during the update.'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return {
      message: `Error: ${errorMessage}`,
      errors: { ...errors, general: errorMessage },
      fieldValues,
      success: false,
    }
  }

  redirect(`/venue/${venueId}?updated=true&from=edit`)
}
