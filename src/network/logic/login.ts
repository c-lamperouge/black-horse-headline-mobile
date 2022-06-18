import { match } from 'ts-pattern'
import { openDBApp } from '@stores/openDB'
import { getAuthorization } from '@network/requests/getAuthorization'
import type { Data as AuthorizationData } from '@network/requests/getAuthorization'
import { getUserInformation } from '@network/requests/getUserInformation'
import type { Data } from '@network/requests/getUserInformation'
import { MultipleResponseResult } from '@network/ResponseResult'

type Login = (phoneNumber: string, verificationCode: string) => Promise<MultipleResponseResult>

const multipleResponseResult = new MultipleResponseResult('login')

const login: Login = async (phoneNumber, verificationCode) => {
  return match(await getAuthorization(phoneNumber, verificationCode))
    .with({ responseType: 'success' }, async result => {
      multipleResponseResult.enqueue(result)
      const token = await updateDBApp(result.responseContent)

      return match(await getUserInformation(token))
        .with({ responseType: 'success' }, result => {
          multipleResponseResult.enqueue(result)
          multipleResponseResult.succeed()
          return multipleResponseResult
        })
        .otherwise(result => {
          multipleResponseResult.enqueue(result)
          multipleResponseResult.fail()
          return multipleResponseResult
        })
    })
    .otherwise(result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.fail()
      return multipleResponseResult
    })
}

const updateDBApp = async (response: Response) => {
  const data: AuthorizationData = await response.json()
  const token = data.data.token
  const refreshToken = data.data.refresh_token

  const db = await openDBApp()
  const transaction = db.transaction(['authorization', 'selectPage'], 'readwrite')
  transaction.objectStore('authorization').put(token, 'token')
  transaction.objectStore('authorization').put(refreshToken, 'refreshToken')
  transaction.objectStore('selectPage').put(true, 'isLoggedIn')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()

  return token
}

export {
  login
}

export type {
  Data
}
