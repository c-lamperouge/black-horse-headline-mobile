import { baseURL } from '@network/URL'

interface ResponseData {
  message: string
  data?: {
    number: string
  }
}

enum SendVerificationCodeErrorType {
  PhoneNumberInvalid,
  RequestTooFrequent,
  ServerDatabaseError,
  InvalidResponseStatus,
}

class SendVerificationCodeError extends Error {
  type: SendVerificationCodeErrorType

  constructor (message: string, type: SendVerificationCodeErrorType) {
    super(message)
    this.name = 'SendVerificationCodeError'
    this.type = type
  }
}

const sendVerificationCode = async (phoneNumber: string) => {
  const response = await fetch(`${baseURL}/v1_0/sms/codes/${phoneNumber}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

  if (response.status === 200) {
    const data: ResponseData = await response.json()
    return data
  } else if (response.status === 404) {
    throw new SendVerificationCodeError('phone number invalid', SendVerificationCodeErrorType.PhoneNumberInvalid)
  } else if (response.status === 429) {
    throw new SendVerificationCodeError('request is too frequent', SendVerificationCodeErrorType.RequestTooFrequent)
  } else if (response.status === 507) {
    throw new SendVerificationCodeError('server database error', SendVerificationCodeErrorType.ServerDatabaseError)
  } else {
    throw new SendVerificationCodeError(`invalid response status: ${response.status}`, SendVerificationCodeErrorType.InvalidResponseStatus)
  }
}

export {
  sendVerificationCode,
  SendVerificationCodeError,
  SendVerificationCodeErrorType
}
