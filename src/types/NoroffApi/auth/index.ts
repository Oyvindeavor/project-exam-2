import { Media } from '@/types/NoroffApi/shared'

export interface NoroffLoginRequest {
  email: string
  password: string
}

export interface loginResponse {
  data: {
    name: string
    email: string
    avatar: Media
    banner: Media
    accessToken: string
    venueManager?: boolean
  }
}

export interface registerRequest {
  name: string
  email: string
  password: string
  bio?: string
  avatar?: Media
  banner?: Media
  venueManager?: boolean
}
