<script setup lang="ts">
import IconHome from '~icons/custom/home'
import IconQuestion from '~icons/custom/question'
import IconVideo from '~icons/custom/video'
import IconAccount from '~icons/custom/account'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tohome = () => {
  router.push({ name: 'main-home' })
}

const toQuestions = () => {
  router.push({ name: 'main-questions' })
}

const toVideos = () => {
  router.push({ name: 'main-videos' })
}

const toAccount = () => {
  router.push({ name: 'main-account' })
}
</script>

<template>
  <div class="block-container">
    <RouterView v-slot="{Component}">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>

    <footer>
      <div
        class="tab-cell"
        :class="{'-active': route.name === 'main-home'}"
        @click="tohome"
      >
        <IconHome class="icon" />

        <span>首页</span>
      </div>

      <div
        class="tab-cell"
        :class="{'-active': route.name === 'main-questions'}"
        @click="toQuestions"
      >
        <IconQuestion class="icon" />

        <span>问答</span>
      </div>

      <div
        class="tab-cell"
        :class="{'-active': route.name === 'main-videos'}"
        @click="toVideos"
      >
        <IconVideo class="icon" />

        <span>视频</span>
      </div>

      <div
        class="tab-cell"
        :class="{'-active': route.name === 'main-account'}"
        @click="toAccount"
      >
        <IconAccount class="icon" />

        <span>我的</span>
      </div>
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
.block-container {
  display: block flex;
  flex: 1;
  flex-direction: column;

  & > footer {
    display: flex;
    width: 100%;
    height: 102px;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    box-shadow: 0 0 8px 0 rgb(0 0 0 / 24%);
  }
}

.tab-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  justify-content: space-evenly;
  color: #707070;

  &.-active {
    color: #3698fa;
  }

  & > .icon {
    font-size: 40px;
  }

  & > span {
    font-size: 20px;
  }
}
</style>
