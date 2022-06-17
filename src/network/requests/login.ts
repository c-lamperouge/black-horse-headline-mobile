import { authorization, AuthorizationRequestError, AuthorizationRequestErrorType } from './authorization'
import { getUserInformation, UserInformationRequestError, UserInformationRequestErrorType } from './userInformations'

enum LoginRequestErrorType {
  RequestMessageDataError,
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
  try {
    const authorizationData = await authorization(phoneNumber, verificationCode)
    const userInformationData = await getUserInformation(authorizationData.data.token)

    return userInformationData
  } catch (e) {
    if (e instanceof AuthorizationRequestError) {
      switch (e.type) {
        case AuthorizationRequestErrorType.RequestMessageDataError:
          return new LoginRequestError('request message data error', LoginRequestErrorType.RequestMessageDataError)
        case AuthorizationRequestErrorType.ServerDatabaseError:
          return new LoginRequestError('server database error', LoginRequestErrorType.ServerDatabaseError)
        case AuthorizationRequestErrorType.InvalidResponseStatus:
          return new LoginRequestError('invalid response status', LoginRequestErrorType.InvalidResponseStatus)
      }
    } else if (e instanceof UserInformationRequestError) {
      switch (e.type) {
        case UserInformationRequestErrorType.RequestMessageDataError:
          return new LoginRequestError('request message data error', LoginRequestErrorType.RequestMessageDataError)
      }
    } else {
      throw e
    }
  }
}

export {
  login,
  LoginRequestError,
  LoginRequestErrorType
}
