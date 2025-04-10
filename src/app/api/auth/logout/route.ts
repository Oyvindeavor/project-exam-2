import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function DELETE() {
  // Clear the accessToken cookie
  const cookieStore = await cookies()
  cookieStore.set({
    name: 'accessToken',
    value: '',
    path: '/',
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
}
