import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'
import { getToken } from '@stores/dBStoreAuthorization'

interface Data {
  message: string
  data: {
    channels: Array<{
      id: number
      name: string
    }>
  }
}

type GetUserChannels = () => Promise<ResponseResult>

const getUserChannels: GetUserChannels = async () => {
  const response = await fetch(`${baseURL}/v1_0/user/channels`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${await getToken()}`
    }
  })

  if (response.ok) {
    return new ResponseResult('getUserChannels', 'success', response)
  } else {
    return new ResponseResult('getUserChannels', 'failure', response)
  }
}

export {
  getUserChannels
}

export type {
  Data
}
