<script setup lang="ts">
// import { $ref } from 'vue/macros'
import IconFirstView from '~icons/custom/firstView'

</script>

<template>
  <div class="block-container">
    <IconFirstView class="icon-first-view" />

    <div class="section-down">
      <h1>
        <span class="left">黑马</span>
        <span class="right">头条</span>
      </h1>

      <h2>技术热点的追求者</h2>

      <button disabled>
        立即体验
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-container {
  display: block flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.icon-first-view {
  width: 436px;
  height: 348px;
  margin-top: 280px;
  margin-bottom: 100px;
}

.section-down {
  display: block flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h1 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 50px;
    font-weight: normal;

    & > .left {
      color: #000;
    }

    & > .right {
      color: #3698fa;
    }
  }

  & > h2 {
    margin-top: 14px;
    margin-bottom: 118px;
    color: #666;
    font-size: 40px;
    font-weight: lighter;
  }

  & > button {
    width: 260px;
    height: 63px;
    box-sizing: border-box;
    border: 2px solid #3698fa;
    background-color: transparent;
    border-radius: 31.5px;
    color: #3698fa;
    font-size: 35px;
    transition: color 0.25s linear 0s, background-color 0.25s linear 0s;

    &:disabled {
      background-color: #ccc;
    }

    &:active {
      background-color: #3698fa;
      color: white;
    }
  }
}
</style>
