<script setup lang="ts">
import './assets/style/theme.postcss'
import { useRouter, RouterView } from 'vue-router'
import './router/routerTransition.postcss'
import { useStore } from '@stores/loading'
import BodyOverlay from '@components/BodyOverlay.vue'
import SlotLoading from '@components/OverlaySlotLoading.vue'

const loadingStore = useStore()
// on routing hint for slow network
const router = useRouter()
let timeoutId: number
router.beforeEach(() => {
  timeoutId = setTimeout(() => {
    loadingStore.isLoading = true
  }, 500)
})
router.afterEach(() => {
  clearTimeout(timeoutId)
  if (loadingStore.isLoading) {
    loadingStore.isLoading = false
  }
})
</script>

<template>
  <div class="app-transition-container">
    <RouterView>
      <template #default="{Component, route}">
        <Transition
          :name="route.meta.transition1"
        >
          <component :is="Component" />
        </Transition>
      </template>
    </RouterView>
  </div>

  <BodyOverlay
    v-model="loadingStore.isLoading"
    backdrop-theme="light"
    :enable-close="false"
    slot-transition-name="fade"
  >
    <SlotLoading />
  </BodyOverlay>
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
  height: 100%;
}
</style>

<style scoped lang="postcss">
.app-transition-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

/* vue transition class */
.fade-enter-active {
  transition: opacity 0.25s linear 0s;
}

.fade-leave-active {
  transition: opacity 0.25s linear 0s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
