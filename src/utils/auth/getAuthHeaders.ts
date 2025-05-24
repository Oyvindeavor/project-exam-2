import { cookies } from 'next/headers'

/**
 * Asynchronously generates authentication headers for API requests.
 *
 * Retrieves the `accessToken` from cookies and the external API key from environment variables.
 * Constructs and returns a headers object containing:
 * - `Content-Type: application/json`
 * - `X-Noroff-API-Key` with the API key value (if available)
 * - `Authorization: Bearer <accessToken>` if an access token is present
 *
 * @returns {Promise<HeadersInit>} A promise that resolves to the headers object for authenticated requests.
 */
export const getAuthHeaders = async () => {
  const accessToken = (await cookies()).get('accessToken')?.value
  const apiKey = process.env.EXTERNAL_API_KEY

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': apiKey || '',
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  return headers
}
