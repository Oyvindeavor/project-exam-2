'use server'

import { cookies } from 'next/headers'

type CookieData = {
  accessToken: string
  name: string
  venueManager: boolean
}

export async function setAuthCookies({ accessToken, name, venueManager }: CookieData) {
  const cookieStore = await cookies()
  const isProduction = process.env.NODE_ENV === 'production'
  const cookieMaxAge = 60 * 60 // 1 hour

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
