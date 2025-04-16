import type {
  ApiLoginRequestBody,
  ApiLoginSuccessResponse,
  ApiLoginErrorResponse,
} from '@/types/MyApi/auth'

export type LoginUtilityResult =
  | {
      ok: true
      status: number
      data: ApiLoginSuccessResponse
    }
  | {
      ok: false
      status: number
      error: string
    }

export default async function Login(email: string, password: string): Promise<LoginUtilityResult> {
  const requestBody: ApiLoginRequestBody = { email, password }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      let errorMessage = `Login failed with status: ${response.status}`
      try {
        const errorData: ApiLoginErrorResponse = await response.json()
        errorMessage = errorData.error || errorMessage
      } catch (e) {
        console.error('Could not parse error JSON from /api/auth/login:', e)
      }
      return { ok: false, status: response.status, error: errorMessage }
    }

    const data: ApiLoginSuccessResponse = await response.json()
    return { ok: true, status: response.status, data }
  } catch (error) {
    console.error('Network or fetch error during login utility:', error)
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'An unknown network error occurred',
    }
  }
}
