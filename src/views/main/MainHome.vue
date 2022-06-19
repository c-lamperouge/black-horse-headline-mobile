<script setup lang="ts">
import { reactive } from 'vue'
import { $ref } from 'vue/macros'
import IconSearch from '~icons/ic/baseline-search'
import IconMenu from '~icons/ic/round-menu'

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

// about tab bar element
interface Tab {
  id: number
  title: string
}
const tabs: Array<Tab> = reactive([
  {
    id: 1,
    title: '推荐'
  },
  {
    id: 2,
    title: '热门话题'
  },
  {
    id: 3,
    title: '科技动态'
  },
  {
    id: 4,
    title: 'HTML'
  },
  {
    id: 5,
    title: 'CSS'
  },
  {
    id: 6,
    title: 'JS'
  }
])
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

    <nav class="header-tab-bar">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="item -active"
      >
        <span class="title">{{ tab.title }}</span>
      </div>

      <div class="menu">
        <IconMenu class="icon" />
      </div>
    </nav>

    <RouterView v-slot="{Component}">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<style lang="postcss" scoped>
.block-container {
  display: block flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
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

.header-tab-bar {
  position: relative;
  display: block flex;
  width: 100%;
  height: 82px;
  overflow-x: auto;

  & > .item {
    position: relative;
    display: block flex;
    flex: 0 0 200px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #edeff3;
    transition: background-color 0.25s linear 0s;

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

  & > .menu {
    position: sticky;
    right: 0;
    display: block flex;
    height: 100%;
    flex: 0 0 66px;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
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
