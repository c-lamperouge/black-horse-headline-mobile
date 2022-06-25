import { autoUpdateTokenRetry } from '@network/decorators/autoUpdateTokenRetry'
import { getArticleDetails } from '@network/requests/getArticleDetails'
import type { Data } from '@network/requests/getArticleDetails'

const autoGetArticleDetails = autoUpdateTokenRetry(getArticleDetails)

export {
  autoGetArticleDetails
}

export type {
  Data
}
