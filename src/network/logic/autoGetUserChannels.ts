import { autoUpdateTokenRetry } from '@network/decorators/autoUpdateTokenRetry'
import { getUserChannels } from '@network/requests/getUserChannels'
import type { Data } from '@network/requests/getUserChannels'

const autoGetUserChannels = autoUpdateTokenRetry(getUserChannels)

export {
  autoGetUserChannels
}

export type {
  Data
}
