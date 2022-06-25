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
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

  if (response.ok) {
    return new ResponseResult('getSearchSuggestions', 'success', response)
  } else {
    return new ResponseResult('getSearchSuggestions', 'failure', response)
  }
}

export {
  getSearchSuggestions
}

export type {
  Data
}
