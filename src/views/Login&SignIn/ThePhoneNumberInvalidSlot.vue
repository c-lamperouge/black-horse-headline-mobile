<script setup lang="ts">
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
    <div
      v-if="props.modelValue"
      class="slot-container"
      @click="handleSlotClick"
    >
      <p>电话号码格式错误（11位数字，且以13、15、17、18、19开头）</p>
    </div>
  </Transition>
</template>

<style scoped lang="postcss">
.slot-container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 375px;
  background-color: rgb(0 0 0 / 70%);
  border-radius: 8px;
  color: #eee;
  transform: translate(-50%, -50%);

  & > p {
    margin-block: 1em;
    margin-inline: 1em;
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
