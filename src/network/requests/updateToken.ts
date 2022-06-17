import { baseURL } from '@network/URL'
import { match } from 'ts-pattern'

interface Data {
  message: string
  data: {
    token: string
  }
}

const enum Error {
  RequestMessageDataError,
  RefreshTokenExpire,
  ServerDatabaseError,
  InvalidResponseStatus,
}

type Result = {
  success: true
  data: Data
} | {
  success: false,
  error: Error
}

type UpdateToken = (refreshToken: string) => Promise<Result>

const updateToken: UpdateToken = async (refreshToken) => {
  const response = await fetch(`${baseURL}/v1_0/authorizations`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${refreshToken}`
    }
  })
  const data: Data = await response.json()

  return match<number, Result>(response.status)
    .with(201, () => ({ success: true, data }))
    .with(400, () => ({ success: false, error: Error.RequestMessageDataError }))
    .with(403, () => ({ success: false, error: Error.RefreshTokenExpire }))
    .with(507, () => ({ success: false, error: Error.ServerDatabaseError }))
    .otherwise(() => ({ success: false, error: Error.InvalidResponseStatus }))
}

export {
  updateToken,
  Error
}

export type {
  Data
}
