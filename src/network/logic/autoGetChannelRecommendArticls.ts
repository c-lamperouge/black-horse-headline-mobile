import { autoUpdateTokenRetry } from '@network/decorators/autoUpdateTokenRetry'
import { getChannelRecommendArticles } from '@network/requests/getChannelRecommendArticles'
import type { Data } from '@network/requests/getChannelRecommendArticles'

const autoGetChannelRecommendArticles = autoUpdateTokenRetry(getChannelRecommendArticles)

export {
  autoGetChannelRecommendArticles
}

export type {
  Data
}
