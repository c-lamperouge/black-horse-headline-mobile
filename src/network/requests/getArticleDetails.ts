import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'
import { getToken } from '@stores/dBStoreAuthorization'

interface Data {
  data: {
    art_id: string
    title: string
    pubdate: string
    aut_id: string
    aut_name: string
    aut_photo: string | null
    is_followed: boolean
    attitude: -1 | 0 | 1
    content: string
    is_collected: boolean
  }
  message: string
}

type GetArticleDetails = (id: number) => Promise<ResponseResult>

const getArticleDetails: GetArticleDetails = async (id) => {
  const response = await fetch(`${baseURL}/v1_0/articles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${await getToken()}`
    }
  })

  if (response.ok) {
    return new ResponseResult('getSearchArticle', 'success', response)
  } else {
    return new ResponseResult('getSearchArticle', 'failure', response)
  }
}

export {
  getArticleDetails
}

export type {
  Data
}
