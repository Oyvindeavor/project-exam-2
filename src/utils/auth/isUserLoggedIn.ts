import { cookies } from 'next/headers'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

/**
 * Checks if a user is logged in based on the presence of the 'accessToken' cookie.
 * This function is designed to be used ONLY in Server Components or Route Handlers
 * as it relies on `next/headers`.
 * @returns {Promise<boolean>} True if the access token cookie exists, false otherwise.
 * @throws {Error} If an unexpected error occurs during the cookie retrieval.
 *
 * @example
 * const isLoggedIn = await isUserLoggedIn();
 * console.log('User logged in:', isLoggedIn);
 * // Output: User logged in: true
 *
 * @example
 * // Using this function in multiple components
 * const isLoggedIn = await isUserLoggedIn();
 *
 * <p>Welcome, {isLoggedIn ? 'User' : 'Guest'}!</p>
 */
export async function isUserLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const accessTokenCookie: RequestCookie | undefined = cookieStore.get('accessToken')
  return !!accessTokenCookie
}
