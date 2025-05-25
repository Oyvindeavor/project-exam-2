'use server'

type ActionState = {
  error?: string
  success?: string
}

import deleteBooking from '@/utils/api/bookings/deleteBooking'
import { revalidatePath } from 'next/cache'

export async function deleteBookingFormAction(id: string): Promise<ActionState> {
  try {
    await deleteBooking(id)
    revalidatePath('/profile')
    return {
      success: 'Booking successfully deleted.',
    }
  } catch (error) {
    console.error('Delete booking action failed:', error)
    return {
      error: 'Failed to delete booking. Please try again.',
    }
  }
}
