<script setup lang="ts">
import { match } from 'ts-pattern'
import { openAppDB } from '@stores/openDB'
import { getAuthorization } from '@network/requests/getAuthorization'
import type { Data as AuthorizationData } from '@network/requests/getAuthorization'
import { autogetUserInformation } from '@network/logic/autoGetUserInformation'
import type { Data } from '@network/logic/autoGetUserInformation'

const getAuthorizationTest = async () => {
  match(await getAuthorization('17085420503', '246810'))
    .when(response => response.ok, async response => {
      const data: AuthorizationData = await response.json()
      const db = await openAppDB()
      const transaction = db.transaction('authorization', 'readwrite')
      transaction.store.put(data.data.token, 'token')
      transaction.store.put(data.data.refresh_token, 'refreshToken')
      transaction.done.catch(e => {
        console.error(e)
      })
      db.close()
    })
    .otherwise(async response => {
      console.log('otherwise')
      const data = await response.json()
      console.log(data)
    })
}

const getToken = async () => {
  const db = await openAppDB()
  const transaction = db.transaction('authorization')
  const token = await transaction.store.get('token')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()

  return token
}

const info = async () => {
  const token = await getToken()
  if (token === undefined) {
    throw new Error('token not found')
  }

  match(await autogetUserInformation(token))
    .when(response => response.ok, async response => {
      const data: Data = await response.json()
      console.log(data)
    })
    .otherwise(() => {
      console.log('info failed')
    })
}

</script>

<template>
  <div class="block-container">
    <button @click="getAuthorizationTest">
      getAuthorization
    </button>

    <button @click="info">
      test
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
