<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from '@stores/app'
import { useRouter } from 'vue-router'

const appStore = useStore()
const router = useRouter()

const selectPage = () => {
  if (!appStore.isShowenFirstView) {
    router.push({
      name: 'first-view'
    })
  } else {
    if (appStore.isLoggedIn) {
      router.push({
        name: 'test'
      })
    } else {
      router.push({
        name: 'login'
      })
    }
  }
}

onBeforeMount(selectPage)
</script>

<template>
  <RouterView v-slot="{Component}">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style lang="postcss">
/* global initialize style */
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  font-family: sans-serif, monospace;
}

input {
  font-family: sans-serif, monospace;
}

button {
  font-family: sans-serif, monospace;
  user-select: none;
}

#app {
  display: block flex;
  height: 100%;
  flex-flow: column nowrap;
}
</style>
