'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import updateVenueById from '@/utils/api/venues/updateVenue'
import type {
  UpdateVenueRequest,
  UpdateVenueResponse,
} from '@/types/NoroffApi/response/venuesResponse'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

// --- Zod Schema for Validation  ---
const venueSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  mediaUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
  mediaAlt: z.string().optional(),
  price: z.coerce.number().positive('Price must be positive'),
  maxGuests: z.coerce.number().int().positive('Max guests must be a positive integer'),
  rating: z.coerce.number().min(0).max(5).optional(),
  wifi: z.boolean().optional(),
  parking: z.boolean().optional(),
  breakfast: z.boolean().optional(),
  pets: z.boolean().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  continent: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
})

export interface UpdateVenueFormState {
  message: string
  errors?: {
    [key: string]: string[] | undefined
  }
  fieldValues?: Partial<UpdateVenueRequest>
  success: boolean
}

// --- Server Action Function ---
export async function updateVenueAction(
  venueId: string,
  prevState: UpdateVenueFormState,
  formData: FormData
): Promise<UpdateVenueFormState> {
  console.log('Server Action Triggered. Venue ID:', venueId)

  // --- Prepare Data for Validation & API  ---
  const rawFormData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    media: formData.get('mediaUrl')
      ? [
          {
            url: formData.get('mediaUrl') as string,
            alt: (formData.get('mediaAlt') as string) || '',
          },
        ]
      : [],
    price: Number(formData.get('price')),
    maxGuests: Number(formData.get('maxGuests')),
    rating: formData.get('rating') ? Number(formData.get('rating')) : undefined,
    meta: {
      wifi: formData.get('wifi') === 'on',
      parking: formData.get('parking') === 'on',
      breakfast: formData.get('breakfast') === 'on',
      pets: formData.get('pets') === 'on',
    },
    location: {
      address: (formData.get('address') as string) || undefined,
      city: (formData.get('city') as string) || undefined,
      zip: (formData.get('zip') as string) || undefined,
      country: (formData.get('country') as string) || undefined,
      continent: (formData.get('continent') as string) || undefined,

      lat: formData.get('lat') ? Number(formData.get('lat')) : undefined,
      lng: formData.get('lng') ? Number(formData.get('lng')) : undefined,
    },
  }

  const dataToValidate = {
    ...rawFormData,
    wifi: rawFormData.meta?.wifi,
    parking: rawFormData.meta?.parking,
    breakfast: rawFormData.meta?.breakfast,
    pets: rawFormData.meta?.pets,
    // Map location for validation
    address: rawFormData.location?.address ?? undefined,
    city: rawFormData.location?.city ?? undefined,
    zip: rawFormData.location?.zip ?? undefined,
    country: rawFormData.location?.country ?? undefined,
    continent: rawFormData.location?.continent ?? undefined,
    lat: rawFormData.location?.lat ?? undefined,
    lng: rawFormData.location?.lng ?? undefined,
    // Map media for validation
    mediaUrl: rawFormData.media?.[0]?.url ?? undefined,
    mediaAlt: rawFormData.media?.[0]?.alt ?? undefined,
  }

  const validatedFields = venueSchema.safeParse(dataToValidate)

  if (!validatedFields.success) {
    console.error('Validation Failed:', validatedFields.error.flatten().fieldErrors)
    return {
      message: 'Validation failed. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: rawFormData,
      success: false,
    }
  }

  try {
    console.log('Calling updateVenueById with ID:', venueId)
    console.log('Request Body:', JSON.stringify(rawFormData))

    const result = await updateVenueById(venueId, rawFormData)

    if (result && typeof result === 'object' && 'error' in result) {
      const errorResult = result as ApiErrorResponse
      console.error('API Error updating venue:', errorResult.error)
      return {
        message: `API Error: ${errorResult.error}`,
        fieldValues: rawFormData,
        success: false,
      }
    }

    const updatedData = result as UpdateVenueResponse
    console.log('Venue Updated Successfully (via external function):', updatedData)

    revalidatePath('/venues')
    revalidatePath(`/venues/${venueId}`)
    revalidatePath(`/venues/edit/${venueId}`)
  } catch (error) {
    console.error('Network or unexpected error during updateVenueById call:', error)
    let errorMessage = 'An unexpected error occurred during the update.'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return {
      message: `Error: ${errorMessage}`,
      fieldValues: rawFormData,
      success: false,
    }
  }

  redirect(`/venue/${venueId}`)
}
