import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'
import { getToken } from '@stores/dBStoreAuthorization'

interface Data {
  message: string
  data: {
    pre_timestamp: number
    results: Array<{
      art_id: string
      title: string
      aut_id: string
      aut_name: string
      comm_count: string
      pubdate: string
      cover: {
        type: 0 | 1 | 3
        images: string[]
      }
    }>
  }
}

type GetChannelRecommendArticles = (channelId: number, timestamp: number,) => Promise<ResponseResult>

const getChannelRecommendArticles: GetChannelRecommendArticles = async (channelId, timestamp) => {
  const response = await fetch(`${baseURL}/v1_0/articles?channel_id=${channelId}&timestamp=${timestamp}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${await getToken()}`
    }
  })

  if (response.ok) {
    return new ResponseResult('getChannelRecommendArticles', 'success', response)
  } else {
    return new ResponseResult('getChannelRecommendArticles', 'failure', response)
  }
}

export {
  getChannelRecommendArticles
}

export type {
  Data
}
