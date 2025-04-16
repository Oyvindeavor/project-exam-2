import { ENDPOINTS } from '@/utils/constants/apiConstants'
import { NextResponse } from 'next/server'
import type {
  ApiLoginRequestBody,
  ApiLoginSuccessResponse,
  ApiLoginErrorResponse,
} from '@/types/MyApi/auth'
import type { NoroffLoginResponse } from '@/types/NoroffApi/auth'
import type { ApiError } from '@/types/NoroffApi/errorMessage'

export async function POST(request: Request) {
  const body: ApiLoginRequestBody = await request.json()
  const { email, password } = body

  if (!email || !password) {
    const errorResponse: ApiLoginErrorResponse = { error: 'Email and password are required' }
    return NextResponse.json(errorResponse, { status: 400 })
  }

  try {
    const authResponse = await fetch(ENDPOINTS.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!authResponse.ok) {
      try {
        const errorData: ApiError = await authResponse.json()
        const errorMessage = errorData.errors?.[0]?.message || 'Login failed via external API'
        const errorResponse: ApiLoginErrorResponse = { error: errorMessage }
        return NextResponse.json(errorResponse, { status: authResponse.status })
      } catch (parseError) {
        console.error('Failed to parse external API error response:', parseError)
        const errorResponse: ApiLoginErrorResponse = {
          error: 'External API returned non-JSON error',
        }
        return NextResponse.json(errorResponse, { status: authResponse.status })
      }
    }

    const externalResponse: NoroffLoginResponse = await authResponse.json()
    const loginData = externalResponse.data

    const accessToken = loginData.accessToken

    if (accessToken) {
      const successResponse: ApiLoginSuccessResponse = {
        message: 'Login successful',
        accessToken: accessToken,
        name: loginData.name,
        venueManager: loginData.venueManager ?? false,
      }
      return NextResponse.json(successResponse, { status: 200 })
    } else {
      const errorResponse: ApiLoginErrorResponse = {
        error: 'Access token not received from external API',
      }
      return NextResponse.json(errorResponse, { status: 500 })
    }
  } catch (error) {
    console.error('Internal server error in login route:', error)
    const errorResponse: ApiLoginErrorResponse = { error: 'Internal server error' }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
