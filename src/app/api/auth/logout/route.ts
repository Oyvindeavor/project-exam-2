import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function DELETE() {
  const cookieStore = await cookies()

  const clearCookie = (name: string) => {
    cookieStore.set({
      name,
      value: '',
      path: '/',
      maxAge: 0,
      httpOnly: name === 'accessToken',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
  }

  clearCookie('accessToken')
  clearCookie('name')
  clearCookie('venueManager')

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
}
