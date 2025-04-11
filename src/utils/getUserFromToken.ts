import { getAuthHeaders } from './getAuthHeaders'
export async function getUserFromToken(token: string) {
  try {
    const res = await fetch(`${process.env.EXTERNAL_API_BASE}/me`, {
      method: 'GET',
      headers: await getAuthHeaders(),
      cache: 'no-store', // makes sure it's always fresh
    })

    if (!res.ok) return null

    const { data } = await res.json()

    return {
      id: data.id,
      username: data.username,
      avatar: data.avatar,
      email: data.email,
    }
  } catch (err) {
    console.error('Failed to fetch user from token:', err)
    return null
  }
}
