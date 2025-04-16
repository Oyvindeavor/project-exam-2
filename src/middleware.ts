import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the token value
  const token = request.cookies.get('accessToken')?.value
  // const venueManager = request.cookies.get('venueManager')?.value === 'true'

  // --- Define the ONLY path to protect for now ---
  const protectedPath = '/profile'

  // Get the requested pathname
  const pathname = request.nextUrl.pathname

  // Check if the current path starts with the protected path
  // Using startsWith handles subpaths like /profile/edit correctly
  const isProtected = pathname.startsWith(protectedPath)

  // If the path is protected and the user doesn't have a token
  if (isProtected && !token) {
    // Construct the absolute URL for the login page

    // Redirect to the login page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
  }

  // Allow the request to proceed
  return NextResponse.next()
}

// --- Configure the middleware to run ONLY on the profile path and its subpaths ---
export const config = {
  matcher: [
    '/profile/:path*', // This matches /profile, /profile/anything, /profile/anything/else, etc.
  ],
}
