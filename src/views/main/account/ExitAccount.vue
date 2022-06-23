<script setup lang="ts">
import IconWarning from '~icons/ic/baseline-error'

interface ComponentProperties {
  isShow: boolean
}
const props = defineProps<ComponentProperties>()

interface ComponentEmits {
  (e: 'cancel'): void
  (e: 'ok'): void
}
const emit = defineEmits<ComponentEmits>()

const handleCancelClick = () => {
  emit('cancel')
}

const handleOkClick = () => {
  emit('ok')
}
</script>

<template>
  <div class="exit-account-container">
    <Transition name="flip">
      <div
        v-if="props.isShow"
        class="exit-account"
      >
        <h3 class="heading">
          <IconWarning class="icon" />

          确认退出？
        </h3>

        <div class="bottom">
          <button
            class="cancel"
            @click="handleCancelClick"
          >
            取消
          </button>

          <button
            class="ok"
            @click="handleOkClick"
          >
            确认
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="postcss">
.exit-account-container {
  position: fixed;
  top: 50%;
  left: 50%;
  perspective: 800px;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
}

.exit-account {
  display: block flex;
  overflow: hidden;
  width: 60vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: hsl(210deg 25% 97%);
  border-radius: 12px;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 24%);

  & > .heading {
    display: block flex;
    width: 100%;
    min-height: 4.4em;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    padding: 1em;
    margin: 0;
    font-size: 36px;
    font-weight: normal;
    gap: 0.25em;

    & > .icon {
      color: hsl(37deg 87% 53%);
      vertical-align: middle;
    }
  }

  & > .bottom {
    display: block flex;
    width: 100%;

    & > .cancel {
      flex: 1;
      padding: 0;
      border: none;
      border-top: 2px solid #ccc;
      appearance: none;
      background-color: hsl(0deg 0% 95%);
      font-size: 30px;
      line-height: 2;
      transition: background-color 0.25s linear 0s;

      &:active {
        background-color: hsl(0deg 0% 82%);
      }
    }

    & > .ok {
      flex: 1;
      padding: 0;
      border: none;
      border-top: 2px solid #ccc;
      border-left: 2px solid #ccc;
      appearance: none;
      background-color: hsl(0deg 0% 95%);
      font-size: 30px;
      line-height: 2;
      transition: background-color 0.25s linear 0s;

      &:active {
        background-color: hsl(0deg 0% 82%);
      }
    }
  }
}

/* vue transition class */
.flip-enter-active {
  transform-origin: 0 20%;
  transition: transform 0.25s ease-out 0s, opacity 0.25s linear 0s;
}

.flip-leave-active {
  transform-origin: 0 20%;
  transition: transform 0.25s ease-in 0s, opacity 0.25s linear 0s;
}

.flip-enter-from {
  opacity: 0;
  transform: rotateX(60deg);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateX(60deg);
}
</style>
