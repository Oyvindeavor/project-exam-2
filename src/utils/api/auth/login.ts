import type { ApiLoginRequestBody, ApiLoginSuccessResponse } from '@/types/MyApi/auth'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

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

/**
 * Attempts to log in a user with the provided email and password.
 *
 * Sends a POST request to the `/api/auth/login` endpoint with the given credentials.
 * Returns a `LoginUtilityResult` indicating the success or failure of the login attempt.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to a `LoginUtilityResult` object containing the result of the login attempt.
 *
 * @remarks
 * - If the login is successful, the `data` property will contain the login success response.
 * - If the login fails, the `error` property will contain an error message.
 * - Handles both API and network errors.
 * - The `status` property indicates the HTTP status code of the response.
 *
 * @example
 * ```typescript
 * const { ok, status, data } = await Login("oyvind", "password123")
 * if (ok) {
 *   console.log("Login successful:", data)
 * } else {
 *   console.error("Login failed:", status, data)
 * }
 * }
 * ```
 */
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
        const errorData: ApiErrorResponse = await response.json()
        errorMessage = errorData.error || errorMessage
      } catch (e) {
        errorMessage = String(e)
      }
      return { ok: false, status: response.status, error: errorMessage }
    }

    const data: ApiLoginSuccessResponse = await response.json()
    return { ok: true, status: response.status, data }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'An unknown network error occurred',
    }
  }
}
