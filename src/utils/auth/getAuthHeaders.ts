/*
@ Reusable headers that can be used in API requests gets the access token from cookies
api key from environment variables

Note: This is a server component, so you can use it in any server component or API route. 
Will not work in client.

@example
 const headers = await getHeaders()

const res = await fetch(`${API_BASE_URL}/profiles`, {
  method: 'GET',
  headers,
}
*/

import { cookies } from 'next/headers'

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
