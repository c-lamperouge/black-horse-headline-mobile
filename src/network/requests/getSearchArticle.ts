import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'

interface Data {
  data: {
    page: number
    per_page: number
    results: Array<{
      art_id: string
      title: string
      aut_id: string
      aut_name: string
      comm_count: string
      pubdate: string
      cover: {
        type: '0' | '1' | '2'
        images: string[]
      }
      like_count: number
      collect_count: number
      total_count: number
    }>
  }
  message: string
}

type GetSearchArticle = (keyword: string, page?: number, eachPage?: number) => Promise<ResponseResult>

const getSearchArticle: GetSearchArticle = async (keyword, page?, eachPage?) => {
  let query = `?q=${keyword}`
  if (page !== undefined) {
    query += `&page=${page}`
  }
  if (eachPage !== undefined) {
    query += `&per_page=${eachPage}`
  }

  const response = await fetch(`${baseURL}/v1_0/search${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

  if (response.ok) {
    return new ResponseResult('getSearchArticle', 'success', response)
  } else {
    return new ResponseResult('getSearchArticle', 'failure', response)
  }
}

export {
  getSearchArticle
}

export type {
  Data
}
