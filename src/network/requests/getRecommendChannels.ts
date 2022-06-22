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
    mode: 'cors'
  })

  if (response.ok) {
    return new ResponseResult('getUserChannels', 'success', response)
  } else {
    return new ResponseResult('getUserChannels', 'failure', response)
  }
}

export {
  getRecommendChannels
}

export type {
  Data
}
