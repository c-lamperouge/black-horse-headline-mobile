<script setup lang="ts">
</script>

<template>
  <RouterView />
</template>

<style lang="postcss">
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  font-family: sans-serif, monospace;
}

#app {
  display: block flex;
  height: 100%;
  flex-flow: column nowrap;
}
</style>
