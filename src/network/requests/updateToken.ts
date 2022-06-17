import { baseURL } from '@network/URL'

interface ResponseData {
  message: string
  data: {
    token: string
  }
}

enum UpdateTokenRequestErrorType {
  RequestDataMessageError,
  RefreshTokenExpire,
  ServerDatabaseError,
  InvalidResponseStatus,
}

class UpdateTokenRequestError extends Error {
  type: UpdateTokenRequestErrorType

  constructor (message: string, type: UpdateTokenRequestErrorType) {
    super(message)
    this.name = 'UpdateTokenRequestError'
    this.type = type
  }
}

const updateToken = async (refreshToken: string) => {
  const response = await fetch(`${baseURL}/v1_0/authorizations`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${refreshToken}`
    }
  })

  if (response.status === 201) {
    const data: ResponseData = await response.json()
    return data
  } else if (response.status === 400) {
    throw new UpdateTokenRequestError('request message data error', UpdateTokenRequestErrorType.RequestDataMessageError)
  } else if (response.status === 403) {
    throw new UpdateTokenRequestError('refresh token expire', UpdateTokenRequestErrorType.RefreshTokenExpire)
  } else if (response.status === 507) {
    throw new UpdateTokenRequestError('server database error', UpdateTokenRequestErrorType.ServerDatabaseError)
  } else {
    throw new UpdateTokenRequestError(`invalid response status: ${response.status}`, UpdateTokenRequestErrorType.InvalidResponseStatus)
  }
}

export {
  updateToken,
  UpdateTokenRequestError,
  UpdateTokenRequestErrorType
}
