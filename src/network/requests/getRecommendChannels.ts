import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'

interface Data {
  message: string
  data: {
    channels: Array<{
      id: string
      name: string
    }>
  }
}

type GetRecommendChannels = () => Promise<ResponseResult>

const getRecommendChannels: GetRecommendChannels = async () => {
  const response = await fetch(`${baseURL}/v1_0/channels`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

  if (response.ok) {
    return new ResponseResult('getRecommendChannels', 'success', response)
  } else {
    return new ResponseResult('getRecommendChannels', 'failure', response)
  }
}

export {
  getRecommendChannels
}

export type {
  Data
}
