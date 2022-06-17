<script setup lang="ts">
import { getAuthorization } from '@network/requests/getAuthorization'
import { match, P } from 'ts-pattern'

const test = async () => {
  match(await getAuthorization('13911111111', '246810'))
    .with({ success: false }, () => {})
    .with({ success: true, data: P.select() }, (data) => {
      console.log(data)
    })
    .exhaustive()
}
</script>

<template>
  <div class="block-container">
    <button @click="test">
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
