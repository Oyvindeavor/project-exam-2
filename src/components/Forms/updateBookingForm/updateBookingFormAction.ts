'use server'

import { revalidatePath } from 'next/cache'

import { updateBookingSchema } from './updateBookingSchema'
import updateBooking from '@/utils/api/bookings/updateBooking'
import type { UpdateBookingRequest } from '@/types/NoroffApi/response/bookingsResponse'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

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
  const rawFormData = {
    dateFrom: formData.get('dateFrom') as string,
    dateTo: formData.get('dateTo') as string,
    guests: formData.get('guests'),
  }

  // --- Validate Data ---
  const validatedFields = updateBookingSchema.safeParse(rawFormData)

  const fieldValuesForState: Partial<UpdateBookingRequest> = {
    dateFrom: rawFormData.dateFrom,
    dateTo: rawFormData.dateTo,
    guests: rawFormData.guests ? Number(rawFormData.guests) : undefined,
  }

  if (!validatedFields.success) {
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

    // --- Revalidation ---
    revalidatePath('/profile')
    revalidatePath(`/bookings`)
    revalidatePath(`/bookings/${bookingId}`)
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
