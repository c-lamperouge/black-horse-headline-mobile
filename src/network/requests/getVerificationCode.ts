import { baseURL } from '@network/URL'
import { match } from 'ts-pattern'

interface Data {
  message: string
  data?: {
    number: string
  }
}

const enum Error {
  PhoneNumberInvalid,
  RequestTooFrequent,
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

type GetVerificationCode = (phoneNumber: string) => Promise<Result>

const getVerificationCode: GetVerificationCode = async (phoneNumber) => {
  const response = await fetch(`${baseURL}/v1_0/sms/codes/${phoneNumber}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
  const data: Data = await response.json()

  return match<number, Result>(response.status)
    .with(200, () => ({ success: true, data }))
    .with(404, () => ({ success: false, error: Error.PhoneNumberInvalid }))
    .with(429, () => ({ success: false, error: Error.RequestTooFrequent }))
    .with(507, () => ({ success: false, error: Error.ServerDatabaseError }))
    .otherwise(() => ({ success: false, error: Error.InvalidResponseStatus }))
}

export {
  getVerificationCode,
  Error
}

export type {
  Data
}
