import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware function for Next.js that protects certain routes by verifying the presence and validity of a JWT access token in cookies.
 *
 * - Checks if the requested path is protected (e.g., `/profile` or `/venue/:id/book`).
 * - If the route is not protected, the request proceeds as normal.
 * - If the route is protected and no valid token is found, redirects the user to the login page.
 * - If a token is present, decodes and validates its expiration.
 * - If the token is expired, clears relevant cookies and redirects to login.
 * - Handles malformed tokens and logs errors.
 *
 * @param request - The incoming Next.js request object.
 * @returns A `NextResponse` object that either allows the request to proceed or redirects to the login page.
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value

  const pathname = request.nextUrl.pathname
  const isProtected = pathname.startsWith('/profile') || /^\/venue\/[^/]+\/book/.test(pathname)

  if (!isProtected) {
    return NextResponse.next()
  }

  if (!token || token === 'undefined') {
    return redirectToLogin()
  }

  try {
    const [, payloadBase64] = token.split('.')
    if (!payloadBase64) throw new Error('Malformed token')

    const payloadJson = Buffer.from(payloadBase64, 'base64').toString()
    const payload = JSON.parse(payloadJson)

    const currentTime = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < currentTime) {
      const response = redirectToLogin()
      response.cookies.set('accessToken', '', { path: '/', maxAge: 0 })
      response.cookies.set('name', '', { path: '/', maxAge: 0 })
      response.cookies.set('venueManager', '', { path: '/', maxAge: 0 })

      return response
    }
  } catch (err) {
    console.error('Token validation failed:', err)
    return redirectToLogin()
  }

  return NextResponse.next()
}

function redirectToLogin() {
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)
}

export const config = {
  matcher: ['/profile/:path*', '/venue/:id/book'],
}
