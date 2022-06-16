import { baseURL } from '@network/URL'

interface ResponseData {
  message: string
  data?: {
    token: string
    refresh_token: string
  }
}

enum LoginRequestErrorType {
  RequestDataFormatError,
  ServerDatabaseError,
  InvalidResponseStatus,
}

class LoginRequestError extends Error {
  type: LoginRequestErrorType

  constructor (message: string, type: LoginRequestErrorType) {
    super(message)
    this.name = 'LoginRequestError'
    this.type = type
  }
}

const login = async (phoneNumber: string, verificationCode: string) => {
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

  if (response.status === 201) {
    const data: ResponseData = await response.json()
    return data
  } else if (response.status === 400) {
    throw new LoginRequestError('request data error', LoginRequestErrorType.RequestDataFormatError)
  } else if (response.status === 507) {
    throw new LoginRequestError('server database error', LoginRequestErrorType.ServerDatabaseError)
  } else {
    throw new LoginRequestError(`invalid response status: ${response.status}`, LoginRequestErrorType.InvalidResponseStatus)
  }
}

export {
  login,
  LoginRequestError,
  LoginRequestErrorType
}
