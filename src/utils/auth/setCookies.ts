'use server'

import { cookies } from 'next/headers'

type CookieData = {
  accessToken: string
  name: string
  venueManager: boolean
}

/**
 * Sets authentication-related cookies for the user, including the access token,
 * user name, and venue manager status. The access token cookie is set as HTTP-only,
 * while the name and venue manager cookies are accessible to client-side scripts.
 * Cookie options such as security, path, max age, and same-site policy are configured
 * based on the environment.
 *
 * @param {CookieData} params - The cookie data to set.
 * @param {string} params.accessToken - The JWT access token to store in a secure, HTTP-only cookie.
 * @param {string} params.name - The user's name to store in a client-accessible cookie.
 * @param {boolean} params.venueManager - Indicates if the user is a venue manager, stored as a string in a client-accessible cookie.
 * @returns {Promise<void>} A promise that resolves when all cookies have been set.
 */
export async function setAuthCookies({ accessToken, name, venueManager }: CookieData) {
  const cookieStore = await cookies()
  const isProduction = process.env.NODE_ENV === 'production'
  const cookieMaxAge = 60 * 60 * 24 //

  const accessTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    path: '/',
    maxAge: cookieMaxAge,
    sameSite: 'strict' as const,
  }

  const clientInfoCookieOptions = {
    httpOnly: false,
    secure: isProduction,
    path: '/',
    maxAge: cookieMaxAge,
    sameSite: 'strict' as const,
  }

  await cookieStore.set({
    name: 'accessToken',
    value: accessToken,
    ...accessTokenCookieOptions,
  })

  await cookieStore.set({
    name: 'name',
    value: name,
    ...clientInfoCookieOptions,
  })

  await cookieStore.set({
    name: 'venueManager',
    value: venueManager.toString(),
    ...clientInfoCookieOptions,
  })
}
