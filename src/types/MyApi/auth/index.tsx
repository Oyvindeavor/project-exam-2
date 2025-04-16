// Login types

/**
 * Shape of the successful JSON response FROM the internal /api/auth/login endpoint.
 */
export type ApiLoginSuccessResponse = {
  message: string
  name: string
  venueManager: boolean
  accessToken: string // <<< Ensure this is included
}

/**
 * Shape of the error JSON response FROM the internal /api/auth/login endpoint.
 */
export type ApiLoginErrorResponse = {
  error: string
}

/**
 * Shape of the request body sent TO the internal /api/auth/login endpoint.
 */
export type ApiLoginRequestBody = {
  email: string
  password: string
}

// Register API types

/**
 * Shape of the successful JSON response FROM the internal /api/auth/register endpoint.
 */
export type ApiRegisterSuccessResponse = {
  message: string
  name: string
  venueManager: boolean
}

/**
 * Shape of the error JSON response FROM the internal /api/auth/register endpoint.
 */
export type ApiRegisterErrorResponse = {
  error: string
}

/**
 * Shape of the request body sent TO the internal /api/auth/register endpoint.
 */
export type ApiRegisterRequestBody = {
  name: string
  email: string
  password: string
  venueManager: boolean
}
