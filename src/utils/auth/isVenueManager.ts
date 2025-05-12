import { cookies } from 'next/headers'

export default async function isUserVenueManager(): Promise<boolean> {
  const cookieStore = await cookies()
  const venueManagerCookie = cookieStore.get('venueManager')
  return venueManagerCookie?.value === 'true'
}
