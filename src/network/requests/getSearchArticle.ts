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
  const url = new URL(`${baseURL}/v1_0/search`)
  url.searchParams.set('q', keyword)
  if (page !== undefined) {
    url.searchParams.set('page', page.toString())
  }
  if (eachPage !== undefined) {
    url.searchParams.set('per_page', eachPage.toString())
  }

  const response = await fetch(url, {
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
