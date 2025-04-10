import { NextResponse } from 'next/server'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type { registerRequest } from '@/types/auth'
import type { ApiErrorItem } from '@/types/api/errorMessage'

export async function POST(request: Request) {
  const { name, email, password }: registerRequest = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
  }

  try {
    const response = await fetch(ENDPOINTS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      const errorData: ApiErrorItem = await response.json()
      return NextResponse.json(
        { error: errorData.message || 'Registration failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
