import type { ApiRegisterSuccessResponse, ApiRegisterRequestBody } from '@/types/MyApi/auth'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

export default async function Register(
  name: string,
  email: string,
  password: string,
  venueManager: boolean
) {
  const registerRequest: ApiRegisterRequestBody = {
    name,
    email,
    password,
    venueManager,
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerRequest),
    })

    if (!response.ok) {
      let errorMessage = `Registration failed with status: ${response.status}`
      try {
        const errorData: ApiErrorResponse = await response.json()
        errorMessage = errorData?.error ?? errorMessage
      } catch (e) {
        console.log('Could not parse error JSON from /api/auth/register:', e)
      }
      return { ok: false, status: response.status, error: errorMessage }
    }

    const data: ApiRegisterSuccessResponse = await response.json()
    return { status: response.status, ok: response.ok, data }
  } catch (error) {
    console.log('Network or server error during registration:', error)
    return { ok: false, status: 500, error: 'Could not connect to registration endpoint.' }
  }
}
