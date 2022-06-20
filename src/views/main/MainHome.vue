<script setup lang="ts">
import { reactive, onBeforeMount, defineAsyncComponent } from 'vue'
import { $ref } from 'vue/macros'
import IconSearch from '~icons/ic/baseline-search'
import IconMenu from '~icons/ic/round-menu'
import ArticleListLoading from '@views/main/articleList/ArticleListLoading.vue'
import ArticleListError from '@views/main/articleList/ArticleListError.vue'
import { autoGetUserChannels } from '@network/logic/autoGetUserChannels'
import type { Data } from '@network/logic/autoGetUserChannels'
import { match } from 'ts-pattern'
import EditChannel from './home/EditChannel.vue'

// about header element
const headerEdit = $ref<HTMLInputElement | null>(null)
const onPlaceholderAfterLeave = () => {
  console.log('try focus')
  headerEdit?.focus()
}

let isHeaderPlaceholderShrunken = $ref(false)
const handleHeaderPlaceholderClick = () => {
  isHeaderPlaceholderShrunken = true
}

// eslint-disable-next-line prefer-const
let headerEditModel = $ref('')
const handleHeaderEditBlur = () => {
  isHeaderPlaceholderShrunken = false
  headerEditModel = ''
}

// about channel tab bar element
interface Channel {
  id: number
  name: string
}
const channels: Array<Channel> = reactive([])
let activeChannelId = $ref(0)

onBeforeMount(async () => {
  match(await autoGetUserChannels())
    .with({ responseType: 'success' }, async result => {
      const data: Data = await result.lastContent().json()
      data.data.channels.forEach(channel => {
        channels.push({
          id: channel.id,
          name: channel.name
        })
      })

      activeChannelId = data.data.channels[0].id
    })
    .otherwise(result => {
      console.log(result.responseResultQueue)
    })
})

const handleChannelClick = (channel: Channel) => {
  activeChannelId = channel.id
}

let isShowEditChannel = $ref(false)
const showEditChannel = () => {
  isShowEditChannel = true
}

// article list component
const ArticleList = defineAsyncComponent({
  loader: () => import('@views/main/articleList/ArticleList.vue'),
  loadingComponent: ArticleListLoading,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
  errorComponent: ArticleListError,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
</script>

<template>
  <div class="block-container">
    <header class="header-search">
      <div class="container">
        <input
          ref="headerEdit"
          v-model="headerEditModel"
          type="text"
          class="edit"
          @blur="handleHeaderEditBlur"
        >

        <div
          class="placeholder"
          :class="{'-shrunken': isHeaderPlaceholderShrunken}"
          @click="handleHeaderPlaceholderClick"
        >
          <IconSearch class="icon" />

          <Transition
            name="shrink"
            @after-leave="onPlaceholderAfterLeave"
          >
            <span
              v-show="!isHeaderPlaceholderShrunken"
              class="header-search-placeholder-text"
            >搜索</span>
          </Transition>
        </div>
      </div>
    </header>

    <nav class="channel-tab-bar">
      <div class="left">
        <div
          v-for="channel in channels"
          :key="channel.id"
          class="item"
          :class="{'-active': activeChannelId === channel.id}"
          @click="handleChannelClick(channel)"
        >
          <span class="title">{{ channel.name }}</span>
        </div>
      </div>

      <div
        v-if="channels.length >= 4"
        class="menu"
        @click="showEditChannel"
      >
        <IconMenu class="icon1" />
      </div>
    </nav>

    <ArticleList :channel-id="activeChannelId" />
  </div>

  <EditChannel
    v-model="isShowEditChannel"
    :channels="channels"
  />
</template>

<style lang="postcss" scoped>
.block-container {
  display: block flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
}

.header-search {
  display: block flex;
  height: 88px;
  align-items: center;
  justify-content: center;
  background-color: #3296fa;

  & > .container {
    position: relative;
    height: 64px;
    padding-right: 32px;
    padding-left: 32px;
    background-color: rgb(255 255 255 / 20%);
    border-radius: 32px;

    & > .edit {
      height: 100%;
      box-sizing: border-box;
      padding: 0;
      padding-left: 32px;
      border: none;
      background-color: transparent;
      color: white;
      font-size: 28px;

      &:focus {
        outline: none;
      }
    }

    & > .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      overflow: hidden;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      border-radius: inherit;
      color: white;
      transition: width 0.25s ease-out 0s;

      &.-shrunken {
        width: 64px;
      }

      & > .icon {
        flex-shrink: 0;
        font-size: 32px;
      }
    }
  }
}

.header-search-placeholder-text {
  overflow: hidden;
  max-width: 2em;
  font-size: 28px;
  white-space: nowrap;
}

.channel-tab-bar {
  display: block flex;
  width: 100%;
  height: 82px;

  & > .left {
    flex: 1;
    overflow-x: auto;
    white-space: nowrap;

    & > .item {
      position: relative;
      display: inline flex;
      width: 200px;
      height: 100%;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #edeff3;
      transition: background-color 0.25s linear 0s;
      vertical-align: top;

      &:active {
        background-color: #f2f3f5;
      }

      &.-active {
        &::after {
          position: absolute;
          bottom: 10px;
          left: 50%;
          display: block;
          width: 30px;
          height: 6px;
          background-color: #3296fa;
          border-radius: 3px;
          content: "";
          transform: translateX(-50%);
        }
      }

      & > .title {
        color: #333;
        font-size: 30px;
      }
    }

    & > .item + .item {
      border-left: 1px solid #edeff3;
    }
  }

  & > .menu {
    display: block flex;
    width: 66px;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0 0 8px rgb(0 0 0 / 24%);
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: #f2f3f5;
    }

    & > .icon1 {
      font-size: 32px;
    }
  }
}

/* vue transition class */
.shrink-enter-active {
  transition: opacity 0.25s linear 0s, max-width 0.25s ease-out 0s;
}

.shrink-leave-active {
  transition: opacity 0.25s linear 0s, max-width 0.25s ease-out 0s;
}

.shrink-enter-from {
  max-width: 0;
  opacity: 0;
}

.shrink-leave-to {
  max-width: 0;
  opacity: 0;
}
</style>
