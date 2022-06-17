import { baseURL } from '@network/URL'
import { match } from 'ts-pattern'

interface Data {
  message: string
  data: {
    token: string
    refresh_token: string
  }
}

const enum Error {
  RequestMessageDataError,
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

type GetAuthorization = (phoneNumber: string, verificationCode: string) => Promise<Result>

const getAuthorization: GetAuthorization = async (phoneNumber, verificationCode) => {
  const response = await fetch(`${baseURL}/v1_0/authorizations`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      mobile: phoneNumber,
      code: verificationCode
    })
  })
  const data: Data = await response.json()

  return match<number, Result>(response.status)
    .with(201, () => ({ success: true, data }))
    .with(400, () => ({ success: false, error: Error.RequestMessageDataError }))
    .with(507, () => ({ success: false, error: Error.ServerDatabaseError }))
    .otherwise(() => ({ success: false, error: Error.InvalidResponseStatus }))
}

export {
  getAuthorization,
  Error
}

export type {
  Data
}
