'use server'

import { revalidatePath } from 'next/cache'

import { z } from 'zod'
import updateBooking from '@/utils/api/bookings/updateBooking'
import type {
  UpdateBookingRequest,
  UpdateBookingResponse,
} from '@/types/NoroffApi/response/bookingsResponse'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

// --- Zod Schema for Validation ---
const bookingSchema = z
  .object({
    dateFrom: z.string().min(1, 'Date From is required').date('Invalid date format'),
    dateTo: z.string().min(1, 'Date To is required').date('Invalid date format'),
    guests: z.coerce
      .number({ invalid_type_error: 'Guests must be a number' })
      .int('Guests must be a whole number')
      .positive('Guests must be positive'),
  })
  .refine((data) => new Date(data.dateFrom) < new Date(data.dateTo), {
    message: 'End date must be after start date',
    path: ['dateTo'],
  })

export interface UpdateBookingFormState {
  message: string
  errors?: {
    dateFrom?: string[] | undefined
    dateTo?: string[] | undefined
    guests?: string[] | undefined
    apiError?: string[] | undefined
  }
  fieldValues?: Partial<UpdateBookingRequest>
  success: boolean
}

// --- Server Action Function ---
export async function updateBookingAction(
  bookingId: string,
  prevState: UpdateBookingFormState,
  formData: FormData
): Promise<UpdateBookingFormState | undefined> {
  console.log('Update Booking Server Action Triggered. Booking ID:', bookingId)

  const rawFormData = {
    dateFrom: formData.get('dateFrom') as string,
    dateTo: formData.get('dateTo') as string,
    guests: formData.get('guests'),
  }

  // --- Validate Data ---
  const validatedFields = bookingSchema.safeParse(rawFormData)

  const fieldValuesForState: Partial<UpdateBookingRequest> = {
    dateFrom: rawFormData.dateFrom,
    dateTo: rawFormData.dateTo,
    guests: rawFormData.guests ? Number(rawFormData.guests) : undefined,
  }

  if (!validatedFields.success) {
    console.error('Validation Failed:', validatedFields.error.flatten().fieldErrors)
    return {
      message: 'Validation failed. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: fieldValuesForState,
      success: false,
    }
  }

  // --- Prepare data for API call (using validated data) ---
  const dataForApi: UpdateBookingRequest = {
    dateFrom: validatedFields.data.dateFrom,
    dateTo: validatedFields.data.dateTo,
    guests: validatedFields.data.guests,
  }

  try {
    console.log('Calling updateBooking with ID:', bookingId)
    console.log('Request Body:', JSON.stringify(dataForApi))

    const result = await updateBooking(bookingId, dataForApi)

    if (result && typeof result === 'object' && 'error' in result) {
      const errorResult = result as ApiErrorResponse
      console.error('API Error updating booking:', errorResult.error)
      return {
        message: `API Error: ${errorResult.error}`,
        errors: { apiError: [errorResult.error] },
        fieldValues: dataForApi,
        success: false,
      }
    }

    const updatedData = result as UpdateBookingResponse
    console.log('Booking Updated Successfully:', updatedData)

    // --- Revalidation ---
    revalidatePath('/profile')
    revalidatePath(`/bookings`)
    revalidatePath(`/bookings/${bookingId}`)

    // --- Redirect on Success ---
  } catch (error) {
    console.error('Network or unexpected error during updateBooking call:', error)
    let errorMessage = 'An unexpected error occurred during the update.'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return {
      message: `Error: ${errorMessage}`,
      errors: { apiError: [errorMessage] },
      fieldValues: dataForApi,
      success: false,
    }
  }

  return {
    message: 'Booking updated successfully!',
    errors: {},
    fieldValues: dataForApi,
    success: true,
  }
}
