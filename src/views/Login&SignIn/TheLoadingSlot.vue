<script setup lang="ts">
import IconLoop from '~icons/ic/baseline-loop'

interface ComponentProperties {
  modelValue: boolean
}

interface ComponentEmits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<ComponentProperties>()
const emit = defineEmits<ComponentEmits>()

const handleSlotClick = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <Transition name="fade">
    <IconLoop
      v-if="props.modelValue"
      class="icon-loop"
      @click="handleSlotClick"
    />
  </Transition>
</template>

<style scoped lang="postcss">
@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

.icon-loop {
  position: fixed;
  top: 50%;
  left: 50%;
  animation: rotate 3s linear 0s infinite normal none running;
  color: #555;
  font-size: 100px;
  transform: translate(-50%, -50%);
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
