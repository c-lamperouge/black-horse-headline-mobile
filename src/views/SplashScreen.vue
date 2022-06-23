<script setup lang="ts">
import { useRouter } from 'vue-router'
import { updateViewPath } from '@stores/dBStoreView'
import IconFirstView from '~icons/custom/firstView'

const router = useRouter()

// event handle
const toNextPage = () => {
  router.push('/login')
  updateViewPath('/login')
}
</script>

<template>
  <div class="splash-screen">
    <IconFirstView class="icon-first-view" />

    <div class="section-down">
      <h1>
        <span class="left">黑马</span>
        <span class="right">头条</span>
      </h1>

      <h2>技术热点的追求者</h2>

      <button @click="toNextPage">
        立即体验
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.splash-screen {
  display: block flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.icon-first-view {
  width: 436px;
  height: 348px;
  margin-top: 250px;
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
    appearance: none;
    background-color: transparent;
    border-radius: 31.5px;
    color: #3698fa;
    font-size: 35px;
    transition: color 0.25s linear 0s, background-color 0.25s linear 0s;

    &:active {
      background-color: #3698fa;
      color: white;
    }
  }
}
</style>
