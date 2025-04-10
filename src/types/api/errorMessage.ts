export interface ApiError {
  errors: ApiErrorItem[]
  status: string
  statusCode: number
}

export interface ApiErrorItem {
  message: string
}
