export interface ApiError {
  errors: ApiErrorItem[]
  status: string
  statusCode: number
}

interface ApiErrorItem {
  message: string
}
