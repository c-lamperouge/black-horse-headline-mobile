<script setup lang="ts">
import IconHome from '~icons/custom/home'
import IconQuestion from '~icons/custom/question'
import IconVideo from '~icons/custom/video'
import IconAccount from '~icons/custom/account'

</script>

<template>
  <div class="block-container">
    <RouterView v-slot="{Component}">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>

    <footer>
      <div class="tab-cell">
        <IconHome class="icon" />

        <span>首页</span>
      </div>

      <div class="tab-cell">
        <IconQuestion class="icon" />

        <span>问答</span>
      </div>

      <div class="tab-cell">
        <IconVideo class="icon" />

        <span>视频</span>
      </div>

      <div class="tab-cell -active">
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
  background-color: #edeff3;

  & > footer {
    display: flex;
    width: 100%;
    height: 102px;
    align-items: center;
    justify-content: space-around;
    background-color: white;
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
