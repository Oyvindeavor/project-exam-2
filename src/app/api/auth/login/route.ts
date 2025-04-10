import { ENDPOINTS } from '@/utils/constants/apiConstants'
import { NextResponse } from 'next/server'
import type { loginRequest, loginResponse } from '@/types/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password }: loginRequest = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  try {
    const authResponse = await fetch(ENDPOINTS.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!authResponse.ok) {
      const errorData = await authResponse.json()
      return NextResponse.json(
        { error: errorData.message || 'Login failed' },
        { status: authResponse.status }
      )
    }

    const { data: loginData }: loginResponse = await authResponse.json()
    const accessToken = loginData.accessToken

    if (accessToken) {
      ;(await cookies()).set({
        name: 'accessToken',
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60, // 1 hour
        sameSite: 'strict',
      })

      return NextResponse.json({ message: 'Login successful', user: loginData }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Access token not received' }, { status: 500 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
