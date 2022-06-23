<script setup lang="ts">
import { RouterView } from 'vue-router'
import './router/routerTransition.postcss'

</script>

<template>
  <div class="transition-container">
    <RouterView v-slot="{Component, route}">
      <Transition
        :name="route.meta.transition1"
        mode="out-in"
      >
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
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
.transition-container {
  position: relative;
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
