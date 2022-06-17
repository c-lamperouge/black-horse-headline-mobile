<script setup lang="ts">
import { match, P } from 'ts-pattern'
import { openDBApp } from '@stores/openDB'
import { updateToken, Error } from '@network/requests/updateToken'
import { getAuthorization } from '@network/requests/getAuthorization'

const getRefreshToken = async () => {
  const db = await openDBApp()
  const transaction = db.transaction('authorization', 'readonly')
  const refreshToken = await transaction.store.get('refreshToken')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()

  return refreshToken as string
}

const test = async () => {
  const refreshToken = await getRefreshToken()
  console.log(refreshToken)

  match(await updateToken(refreshToken))
    .with({ success: false, error: Error.RefreshTokenExpire }, () => {
      console.log('refresh token expire')
    })
    .with({ success: false, error: Error.InvalidResponseStatus }, () => {
      console.log('other response status')
    })
    .with({ success: false }, () => {})
    .with({ success: true, data: P.select() }, (data) => {
      console.log(data)
    })
    .exhaustive()
}

const updateAuthorization = async (token: string, refreshToken: string) => {
  const db = await openDBApp()
  const transaction = db.transaction('authorization', 'readwrite')
  transaction.store.put(token, 'token')
  transaction.store.put(refreshToken, 'refreshToken')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()

  return refreshToken as string
}

const getAndUpdateAuthorization = async () => {
  match(await getAuthorization('13911111111', '246810'))
    .with({ success: false }, () => {})
    .with({ success: true, data: P.select() }, async (data) => {
      console.log(data)
      await updateAuthorization(data.data.token, data.data.refresh_token)
    })
    .exhaustive()
}
</script>

<template>
  <div class="block-container">
    <button @click="test">
      test
    </button>

    <button @click="getAndUpdateAuthorization">
      getAndUpdateAuthorization
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.block-container {
  display: block flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #17171f;
}
</style>
