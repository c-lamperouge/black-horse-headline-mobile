import { baseURL } from '@network/URL'
import { updateToken, UpdateTokenRequestError, UpdateTokenRequestErrorType } from './updateToken'
import { openDBApp } from '@stores/openDB'

interface ResponseData {
  message: string
  data: {
    id: number
    name: string
    photo: string
    is_media: 0 | 1
    intro: string
    ceti: string
    art_count: number
    follow_count: number
    fans_count: number
    like_count: number
  }
}

enum UserInformationRequestErrorType {
  RequestMessageDataError,
  UserAuthorizationFailed,
  ServerDatabaseError,
  InvalidResponseStatus,
}

class UserInformationRequestError extends Error {
  type: UserInformationRequestErrorType

  constructor (message: string, type: UserInformationRequestErrorType) {
    super(message)
    this.name = 'UserInformationRequestError'
    this.type = type
  }
}

const getUserInformation = async (token: string) => {
  const response = await fetch(`${baseURL}/v1_0/user`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`
    }
  })

  if (response.ok) {
    const data: ResponseData = await response.json()
    return data
  } else if (response.status === 400) {
    return new UserInformationRequestError('request message data error', UserInformationRequestErrorType.RequestMessageDataError)
  } else if (response.status === 401) {
    // user authorization failed, get new token
    const token = await getNewToken()
    if (typeof token === 'string') {
      getUserInformation(token)
    } else {
      return token
    }
  } else if (response.status === 507) {
    return new UserInformationRequestError('server database error', UserInformationRequestErrorType.ServerDatabaseError)
  } else {
    return new UserInformationRequestError(`invalid response status: ${response.status}`, UserInformationRequestErrorType.InvalidResponseStatus)
  }
}

const getNewToken = async () => {
  const db = await openDBApp()
  const transaction = db.transaction('authorization')
  const refreshToken = await transaction.store.get('refreshToken')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()

  if (refreshToken !== undefined) {
    try {
      const data = await updateToken(refreshToken)
      return data.data.token
    } catch (e) {
      if (e instanceof UpdateTokenRequestError) {
        switch (e.type) {
          case UpdateTokenRequestErrorType.RequestDataMessageError:
            return new UserInformationRequestError('request message data error', UserInformationRequestErrorType.RequestMessageDataError)
          case UpdateTokenRequestErrorType.ServerDatabaseError:
            return new UserInformationRequestError('server database error', UserInformationRequestErrorType.ServerDatabaseError)
          case UpdateTokenRequestErrorType.InvalidResponseStatus:
            return new UserInformationRequestError(e.message, UserInformationRequestErrorType.InvalidResponseStatus)
          case UpdateTokenRequestErrorType.RefreshTokenExpire:
            console.log('refresh token expire, please login again')
        }
      } else {
        throw e
      }
    }
  }
}

export {
  getUserInformation,
  UserInformationRequestError,
  UserInformationRequestErrorType
}
