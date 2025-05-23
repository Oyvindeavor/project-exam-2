'use server'

import createBooking from '@/utils/api/bookings/createBooking'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type ActionResult = {
  error?: string
}

export default async function createBookingFormAction(
  prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const venueId = formData.get('venueId') as string | null
  const dateFrom = formData.get('dateFrom') as string | null
  const dateTo = formData.get('dateTo') as string | null
  const guests = formData.get('guests') as string | null

  if (!venueId || !dateFrom || !dateTo || !guests) {
    return { error: 'All fields are required.' }
  }

  const result = await createBooking({
    dateFrom,
    dateTo,
    guests: parseInt(guests, 10),
    venueId,
  }).catch((error) => {
    console.error('Error creating booking:', error)
    return { error: 'Failed to create booking.' }
  })

  if ('error' in result) {
    return { error: result.error }
  }

  revalidatePath(`venue/${venueId}/book`)
  redirect(`/profile/bookings`)
}
