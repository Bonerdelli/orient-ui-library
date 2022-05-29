/**
 * API integration functions and helpers
 *
 * @author Nekrasov Andrew <bonerdelli@gmail.com>
 * @package orient-ui
 */

import axios from 'axios'
import { Middleware } from 'redux'

export const API_URL = process.env.API_PROXIED_PATH
  ? `${process.env.API_PROXIED_PATH}/${process.env.API_VERSION}`
  : `${process.env.API_URL}/${process.env.API_VERSION}`

export const REQUEST_TIMEOUT = 5000 // in milliseconds

export interface ApiError {
  code?: string
  status?: number
  message: string
}

// TODO: use API error schema or remove
export interface ApiErrorResponse {
  statusCode?: number
  error: ApiError
}

export interface ApiSuccessResponse {
  success?: boolean
}

export type ApiCrudResponse<T = ApiSuccessResponse> = T | ApiErrorResponse

axios.defaults.timeout = REQUEST_TIMEOUT

/**
 * Redux Middleware to set-up authorization header
 */
function createAuthMiddleware(): Middleware {
  return ({ getState }) => next => action => {
    const { user } = getState()
    const token = user?.currentAuth?.accessToken ?? false
    axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : false
    return next(action)
  };
}

export const axiosMiddleware = createAuthMiddleware()

/**
 * Fetch and parse JSON from backend
 */
export async function get<T>(
  path: string,
  onError?: (error?: ApiError) => void,
): Promise<T | ApiErrorResponse> {
  try {
    const url = getEndpointUrl(path)
     const response = await axios.get(url)
     return response.data
  } catch (err: any) {
    return handleApiError(err, onError)
  }
}

/**
 * POST request
 */
export async function post<T, P = any>(
  path: string,
  payload: P,
  onError?: (error?: ApiError) => void,
): Promise<ApiCrudResponse<T>> {
  try {
    const url = getEndpointUrl(path)
     const response = await axios.post(url, payload)
     return response.data
  } catch (err: any) {
    return handleApiError(err, onError)
  }
}

/**
 * DELETE request
 */
export async function del(
  path: string,
  onError?: (error?: ApiError) => void,
): Promise<boolean> {
  try {
    const url = getEndpointUrl(path)
    await axios.delete(url)
    return true
  } catch (err: any) {
    handleApiError(err, onError)
  }
  return false
}

/**
 * Helper function to check if request was successful
 */
export function isSuccessful<T = void>(
  result: ApiCrudResponse<T | ApiSuccessResponse>,
): boolean {
  if (typeof result === 'undefined') {
    return false
  }
  if ((result as ApiErrorResponse).error) {
    return false
  }
  if ((result as ApiSuccessResponse).success) {
    return true
  }
  return true
}

/**
 * Helper function to build endpoint URL
 */
export function getEndpointUrl(path: string): string {
  const url = path.replace(/^\/+/, '').replace(/\/+$/, '')
  return `${API_URL}/${url}`
}

/**
 * Helper function to handle API errors
 */
function handleApiError(
  error?: ApiError,
  onError?: (error?: ApiError) => void,
): ApiErrorResponse {
  if (onError) {
    onError(error)
  } else {
    console.error('API Error', error?.message) // eslint-disable-line no-console
  }
  if (error) {
    return { error }
  }
  return {
    error: { message: 'Unknown API error' },
  }
}
