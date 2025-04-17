export interface NoroffApiError {
  errors: ApiErrorItem[]
  status: string
  statusCode: number
}

interface ApiErrorItem {
  message: string
}
