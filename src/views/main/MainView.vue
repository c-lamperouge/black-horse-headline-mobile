<script setup lang="ts">
import { useRoute, useRouter, RouterView } from 'vue-router'
import IconHome from '~icons/ic/baseline-home'
import IconSearch from '~icons/ic/baseline-search'
import IconAccount from '~icons/ic/baseline-person'

const currentRoute = useRoute()
const router = useRouter()

const tohome = () => {
  router.push('/main/home')
}

const toSearch = () => {
  router.push('/main/search')
}

const toAccount = () => {
  router.push('/main/account')
}
</script>

<template>
  <div class="main-view">
    <div class="main-transition-container">
      <RouterView>
        <template #default="{Component}">
          <KeepAlive>
            <Suspense v-if="Component">
              <component :is="Component" />
            </Suspense>
          </KeepAlive>
        </template>
      </RouterView>
    </div>

    <footer>
      <div
        class="tab-cell"
        :class="{'-active': currentRoute.path.startsWith('/main/home')}"
        @click="tohome"
      >
        <IconHome class="icon" />

        <span>首页</span>
      </div>

      <div
        class="tab-cell"
        :class="{'-active': currentRoute.path.startsWith('/main/search')}"
        @click="toSearch"
      >
        <IconSearch class="icon" />

        <span>搜索</span>
      </div>

      <div
        class="tab-cell"
        :class="{'-active': currentRoute.path.startsWith('/main/account')}"
        @click="toAccount"
      >
        <IconAccount class="icon" />

        <span>账号</span>
      </div>
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
.main-view {
  display: block flex;
  height: 100%;
  flex-direction: column;
  box-shadow: var(--shadow-layer);

  & > footer {
    z-index: 1;
    display: flex;
    width: 100%;
    height: 110px;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    box-shadow: var(--shadow-separate);
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
    font-size: 46px;
  }

  & > span {
    font-size: 28px;
  }
}

.main-transition-container {
  position: relative;
  width: 100%;
  flex: 1;
}
</style>
