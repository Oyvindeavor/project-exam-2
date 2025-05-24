import type { ApiRegisterSuccessResponse, ApiRegisterRequestBody } from '@/types/MyApi/auth'
import type { ApiErrorResponse } from '@/types/MyApi/ApiErrorResponse'

/**
 * Registers a new user by sending a POST request to the registration endpoint.
 *
 * @param name - The name of the user to register.
 * @param email - The email address of the user.
 * @param password - The password for the new user.
 * @param venueManager - Indicates if the user is a venue manager.
 * @returns An object containing the status, success flag, and either the registration data or an error message.
 *
 * @remarks
 * - Returns `{ ok: true, status, data }` on successful registration.
 * - Returns `{ ok: false, status, error }` if registration fails or a network error occurs.
 *
 * @throws Will throw an error if the fetch operation fails or the API returns an error response.
 *
 * @example
 * ```typescript
 * const { status, ok, data } = await Register('John Doe', `password123`)
 * console.log('Registration successful:', data)
 *
 */
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
        errorMessage = String(e)
      }
      return { ok: false, status: response.status, error: errorMessage }
    }

    const data: ApiRegisterSuccessResponse = await response.json()
    return { status: response.status, ok: response.ok, data }
  } catch (error) {
    console.error('Network error:', error)
    return { ok: false, status: 500, error: 'Could not connect to registration endpoint.' }
  }
}
