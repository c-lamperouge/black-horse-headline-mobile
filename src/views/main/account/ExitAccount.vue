<script setup lang="ts">
import IconWarning from '~icons/ic/baseline-error'

interface ComponentEmits {
  (e: 'close'): void
  (e: 'ok'): void
}
const emit = defineEmits<ComponentEmits>()

const handleCancelClick = () => {
  emit('close')
}
const handleOkClick = () => {
  emit('ok')
}
</script>

<template>
  <div class="exit-account">
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
</template>

<style scoped lang="postcss">
.exit-account {
  position: fixed;
  z-index: 11;
  top: calc(50% - 168px);
  left: calc(50% - 312px);
  display: block flex;
  overflow: hidden;
  width: 624px;
  height: 336px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 48px;
  background-color: white;
  border-radius: 12px;
  box-shadow: var(--shadow-dialog);

  & > .heading {
    display: block flex;
    width: 100%;
    min-height: 2.4em;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    font-size: 40px;
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
    box-sizing: border-box;
    justify-content: flex-end;
    gap: 32px;

    & > .cancel {
      box-sizing: border-box;
      padding: 0.5em 1em;
      border: none;
      border: 2px solid hsl(0deg 0% 50%);
      appearance: none;
      background-color: white;
      border-radius: 10px;
      color: hsl(0deg 0% 50%);
      font-size: 32px;
      transition: background-color 0.25s linear 0s;

      &:active {
        background-color: hsl(0deg 0% 90%);
      }
    }

    & > .ok {
      padding: 0.5em 1em;
      border: none;
      appearance: none;
      background-color: hsl(0deg 0% 50%);
      border-radius: 10px;
      color: white;
      font-size: 32px;
      transition: background-color 0.25s linear 0s;

      &:active {
        background-color: hsl(0deg 0% 70%);
      }
    }
  }
}
</style>
