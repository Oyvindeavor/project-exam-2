'use server'

import Register from '@/utils/api/register'
import { redirect } from 'next/navigation'

type ActionResult = {
  error?: string
}

export default async function registerFormAction(
  prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get('name') as string | null
  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null
  const venueManager = formData.get('venueManager') === 'on'

  if (!name || !email || !password) {
    return { error: 'All fields are required.' }
  }

  const result = await Register(name, email, password, venueManager)

  if (!result.ok) {
    return { error: result.error || 'Registration failed.' }
  }

  redirect('/auth/login')
}
