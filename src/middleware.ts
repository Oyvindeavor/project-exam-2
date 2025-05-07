import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value

  const protectedPath = '/profile'
  const pathname = request.nextUrl.pathname
  const isProtected = pathname.startsWith(protectedPath)

  if (isProtected) {
    if (!token) {
      return redirectToLogin()
    }

    // --- Decode the token and check expiry ---
    const [, payloadBase64] = token.split('.')
    if (!payloadBase64) {
      return redirectToLogin()
    }

    try {
      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())
      const currentTime = Math.floor(Date.now() / 1000)

      if (payload.exp && payload.exp < currentTime) {
        // Token expired: clear cookies and redirect
        const response = redirectToLogin()

        response.cookies.set('accessToken', '', {
          path: '/',
          maxAge: 0,
        })
        response.cookies.set('name', '', {
          path: '/',
          maxAge: 0,
        })
        response.cookies.set('venueManager', '', {
          path: '/',
          maxAge: 0,
        })

        return response
      }
    } catch (error) {
      console.error('Failed to parse accessToken:', error)
      return redirectToLogin()
    }
  }

  return NextResponse.next()
}

function redirectToLogin() {
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)
}

export const config = {
  matcher: ['/profile/:path*'],
}
