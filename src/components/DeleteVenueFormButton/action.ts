'use server'

import deleteVenueById from '@/utils/api/venues/deleteVenueById'
import { revalidatePath } from 'next/cache'

type ActionResult = {
  error?: string
}

export async function deleteVenueFormAction(id: string): Promise<ActionResult> {
  try {
    await deleteVenueById(id)
    revalidatePath('/profile')
    return {}
  } catch (error) {
    console.error('Failed to delete venue:', error)
    return { error: 'Failed to delete venue.' }
  }
}
