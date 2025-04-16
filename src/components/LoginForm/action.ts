'use server'

import { redirect } from 'next/navigation'
import Login from '@/utils/api/login'
import { setAuthCookies } from '@/utils/setCookies'

type ActionResult = {
  error?: string
}

export async function loginFormAction(
  prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const result = await Login(email, password)

  if (!result.ok) {
    return { error: result.error }
  }

  try {
    const { accessToken, name, venueManager } = result.data
    await setAuthCookies({ accessToken, name, venueManager })
  } catch (error) {
    console.error('Error setting cookies in server action:', error)
    return { error: 'Failed to process login data after successful authentication.' }
  }

  redirect('/profile')
}
