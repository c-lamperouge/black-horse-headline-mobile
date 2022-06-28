<script setup lang="ts">
// for vue
import { onMounted } from 'vue'
import { $ref } from 'vue/macros'
// for welcome animation
import lottie from 'lottie-web'
import spaceman from '../assets/animation/spaceman.json'
// for router
import { useRouter } from 'vue-router'
import { updateViewPath } from '@stores/dBStoreView'

// welcome animation
const welcomeEl = $ref<HTMLDivElement | null>(null)
onMounted(() => {
  lottie.loadAnimation({
    container: welcomeEl!,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: spaceman
  })
})

// router
const router = useRouter()
// event handle
const toNextPage = () => {
  router.push('/login')
  updateViewPath('/login')
}
</script>

<template>
  <div class="splash-screen">
    <div
      ref="welcomeEl"
      class="animation-welcome"
    />

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
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.animation-welcome {
  width: 500px;
  height: 500px;
  margin-top: 100px;
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
      color: var(--theme-color);
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
    border: 2px solid var(--theme-color);
    appearance: none;
    background-color: transparent;
    border-radius: 31.5px;
    color: var(--theme-color);
    font-size: 35px;
    transition: color 0.25s linear 0s, background-color 0.25s linear 0s;

    &:active {
      background-color: var(--theme-color);
      color: white;
    }
  }
}
</style>
