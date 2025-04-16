import { NextResponse } from 'next/server'
import { ENDPOINTS } from '@/utils/constants/apiConstants'
import type {
  ApiRegisterRequestBody,
  ApiRegisterSuccessResponse,
  ApiRegisterErrorResponse,
} from '@/types/MyApi/auth'
import type { ApiError } from '@/types/NoroffApi/errorMessage'

export async function POST(request: Request) {
  const { name, email, password, venueManager }: ApiRegisterRequestBody = await request.json()

  if (!name || !email || !password) {
    const errorResponse: ApiRegisterErrorResponse = {
      error: 'Name, email, and password are required',
    }
    return NextResponse.json(errorResponse, { status: 400 })
  }

  try {
    const response = await fetch(ENDPOINTS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, venueManager }),
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json()
      const errorResponse: ApiRegisterErrorResponse = {
        error: errorData.errors?.[0]?.message || 'Registration failed',
      }
      return NextResponse.json(errorResponse, { status: response.status })
    }

    const successResponse: ApiRegisterSuccessResponse = {
      message: 'Registration successful',
      name,
      venueManager,
    }

    return NextResponse.json(successResponse, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    const errorResponse: ApiRegisterErrorResponse = { error: 'Internal server error' }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
