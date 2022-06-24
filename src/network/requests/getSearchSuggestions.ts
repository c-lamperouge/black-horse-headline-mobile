import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'

interface Data {
  data: {
    options: string[]
  }
  message: string
}

type GetSearchSuggestions = (keyword: string) => Promise<ResponseResult>

const getSearchSuggestions: GetSearchSuggestions = async (keyword) => {
  const url = new URL(`${baseURL}/v1_0/suggestion`)
  url.searchParams.set('q', keyword)

  const response = await fetch(url, {
    method: 'GET'
  })

  if (response.ok) {
    return new ResponseResult('getSearchArticle', 'success', response)
  } else {
    return new ResponseResult('getSearchArticle', 'failure', response)
  }
}

export {
  getSearchSuggestions
}

export type {
  Data
}
