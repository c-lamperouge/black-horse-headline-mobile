<script setup lang="ts">
import { $ref } from 'vue/macros'

const hello = $ref('hello, world')
</script>

<template>
  <h1>{{ hello }}</h1>
</template>

<style lang="postcss">
h1 {
  color: hsl(153deg 47% 49%);
  text-align: center;
}
</style>
