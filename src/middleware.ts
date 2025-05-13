import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value

  const pathname = request.nextUrl.pathname
  const isProtected = pathname.startsWith('/profile') || /^\/venue\/[^/]+\/book/.test(pathname)

  if (!isProtected) {
    return NextResponse.next()
  }

  if (!token || token === 'undefined') {
    console.log('No valid token found')
    return redirectToLogin()
  }

  try {
    const [, payloadBase64] = token.split('.')
    if (!payloadBase64) throw new Error('Malformed token')

    const payloadJson = Buffer.from(payloadBase64, 'base64').toString()
    const payload = JSON.parse(payloadJson)

    const currentTime = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < currentTime) {
      console.log('Token expired')
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
