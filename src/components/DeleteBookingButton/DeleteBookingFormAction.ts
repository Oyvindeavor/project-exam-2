'use server'

import deleteBooking from '@/utils/api/bookings/deleteBooking'
import { revalidatePath } from 'next/cache'

export async function deleteBookingFormAction(id: string) {
  try {
    await deleteBooking(id)
    revalidatePath('/profile')
    return { error: undefined }
  } catch (error) {
    console.error('Delete booking action failed:', error)

    return {
      error: 'Failed to delete booking. Please try again.',
    }
  }
}
