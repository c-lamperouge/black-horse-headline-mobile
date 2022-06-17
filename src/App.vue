<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from '@stores/app'
import { useRouter } from 'vue-router'
import { openDBApp } from '@stores/openDB'

const appStore = useStore()
// according indexedDB to update appStore
const updateAppStore = async () => {
  const db = await openDBApp()
  const transaction = db.transaction('selectPage', 'readwrite')

  const isShowenFirstView = await transaction.store.get('isShowenFirstView')
  const isLoggedIn = await transaction.store.get('isLoggedIn')
  appStore.isShowenFirstView = isShowenFirstView ?? false
  appStore.isLoggedIn = isLoggedIn ?? false

  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()
}

// according appStore to select page
const selectPage = async () => {
  await updateAppStore()

  if (!appStore.isShowenFirstView) {
    router.push({
      name: 'first-view'
    })
  } else {
    if (appStore.isLoggedIn) {
      router.push({
        name: 'main'
      })
    } else {
      router.push({
        name: 'login'
      })
    }
  }
}

onBeforeMount(selectPage)

const router = useRouter()
// add transition meta data
router.afterEach((to, from) => {
  if (from.name === 'first-view' && to.name === 'login') {
    to.meta.transition = 'router-slide-left'
  } else if (from.name === 'login' && to.name === 'main') {
    to.meta.transition = 'router-slide-left'
  } else if (from.name === 'main' && to.name === 'login') {
    to.meta.transition = 'router-slide-right'
  } else if (from.name === 'login' && to.name === 'first-view') {
    to.meta.transition = 'router-slide-right'
  } else {
    console.log(`router: ${from.path} >> ${to.path}`)
  }
})
</script>

<template>
  <RouterView v-slot="{Component, route}">
    <Transition
      :name="route.meta.transition"
      mode="out-in"
    >
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </Transition>
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
  overflow-x: hidden;
}
</style>

<style scoped lang="postcss">
/* vue transition class */
.router-slide-left-enter-active {
  transition: transform 0.25s ease-out 0s;
}

.router-slide-left-leave-active {
  transition: transform 0.25s ease-in 0s;
}

.router-slide-left-enter-from {
  transform: translateX(100%);
}

.router-slide-left-leave-to {
  transform: translateX(-100%);
}

.router-slide-right-enter-active {
  transition: transform 0.25s ease-out 0s;
}

.router-slide-right-leave-active {
  transition: transform 0.25s ease-in 0s;
}

.router-slide-right-enter-from {
  transform: translateX(-100%);
}

.router-slide-right-leave-to {
  transform: translateX(100%);
}
</style>
