'use server'

import updateProfileByName from '@/utils/api/profiles/updateProfileByName'
import type { UpdateProfileRequest } from '@/types/NoroffApi/response/profileResponse'
import { revalidatePath } from 'next/cache'

interface ActionState {
  success: boolean
  message: string
}

export async function editProfileAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get('name')?.toString()
  if (!name) {
    return { success: false, message: 'Missing user name' }
  }

  const bio = formData.get('bio')?.toString()
  const avatar = formData.get('avatar')?.toString()
  const banner = formData.get('banner')?.toString()
  const venueManager = formData.has('venueManager')
    ? formData.get('venueManager') === 'on'
    : undefined

  const data: UpdateProfileRequest = {}
  if (bio) data.bio = bio
  if (avatar) data.avatar = { url: avatar, alt: 'User avatar' }
  if (banner) data.banner = { url: banner, alt: 'User banner' }
  if (venueManager !== undefined) data.venueManager = venueManager

  if (Object.keys(data).length === 0) {
    return { success: false, message: 'You must fill out at least one field' }
  }

  const result = await updateProfileByName(name, data)

  if ('error' in result) {
    return { success: false, message: result.error }
  }
  revalidatePath('/profile')

  return { success: true, message: 'Profile updated successfully' }
}
