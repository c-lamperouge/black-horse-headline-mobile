<script setup lang="ts">
import { computed } from 'vue'

interface ComponentProperties {
  modelValue: boolean
  enableClickCancel?: boolean
  background?: 'translucent' | 'transparent'
}

interface ComponentEmits {
  (e: 'update:modelValue', value: boolean): void
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { modelValue, enableClickCancel = false, background = 'translucent' } = defineProps<ComponentProperties>()
const emit = defineEmits<ComponentEmits>()

const backdropClass = computed<string>(() => {
  switch (background) {
    case 'translucent':
      return '-bg-translucent'
    case 'transparent':
      return '-bg-transparent'
    default:
      return '-bg-translucent'
  }
})

const handleBackdropClick = () => {
  if (enableClickCancel) {
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="overlay-backdrop"
        :class="backdropClass"
        @click="handleBackdropClick"
      />
    </Transition>

    <slot :is-show="modelValue" />
  </Teleport>
</template>

<style scoped lang="postcss">
.overlay-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.-bg-translucent {
    background-color: rgb(0 0 0 / 40%);
  }

  &.-bg-transparent {
    background-color: transparent;
  }
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
