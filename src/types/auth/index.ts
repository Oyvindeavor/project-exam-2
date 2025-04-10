import { Avatar, Banner } from '@/types/api/shared'

export interface loginRequest {
  email: string
  password: string
}

export interface loginResponse {
  data: {
    name: string
    email: string
    avatar: Avatar
    banner: Banner
    accessToken: string
  }
}

export interface registerRequest {
  name: string
  email: string
  password: string
  bio?: string
  avatar?: Avatar
  banner?: Banner
  venueManager?: boolean
}
