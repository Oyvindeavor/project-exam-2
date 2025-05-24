'use server'
import { cookies } from 'next/headers'

/**
 * Checks if the current user is a venue manager by inspecting the 'venueManager' cookie.
 *
 * @returns A promise that resolves to `true` if the 'venueManager' cookie is set to 'true', otherwise `false`.
 */
export default async function isUserVenueManager(): Promise<boolean> {
  const cookieStore = await cookies()
  const venueManagerCookie = cookieStore.get('venueManager')
  return venueManagerCookie?.value === 'true'
}
