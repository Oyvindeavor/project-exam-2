import { cookies } from 'next/headers'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

/**
 * Checks if a user is logged in based on the presence of the 'accessToken' cookie.
 * This function is designed to be used ONLY in Server Components or Route Handlers
 * as it relies on `next/headers`.
 * @returns {Promise<boolean>} True if the access token cookie exists, false otherwise.
 */
export async function isUserLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const accessTokenCookie: RequestCookie | undefined = cookieStore.get('accessToken')
  return !!accessTokenCookie
}
