<script setup lang="ts">
import { $ref } from 'vue/macros'
import IconSearch from '~icons/ic/baseline-search'
import IconClose from '~icons/ic/baseline-close'
import { RouterView, useRouter } from 'vue-router'
import { useStore } from '@stores/articleSearch'

// router
const router = useRouter()
// store
const articleSearchStore = useStore()

// about header element
const search = $ref<HTMLInputElement | null>(null)
const onPlaceholderAfterLeave = () => {
  search?.focus()
}

let isSearching = $ref(false)
const handleHeaderPlaceholderClick = () => {
  isSearching = true
}

const handleSearchFocus = () => {
  isSearching = true
}
const handleSearchBlur = () => {
  isSearching = false
}

const handleClearMouseDown = () => {
  articleSearchStore.searchValue = ''
  router.push('/main/search/histories')
  search?.blur()
  isSearching = false
}

// logic
const hancleSearchInput = () => {
  const switchRouter = () => {
    if (articleSearchStore.searchValue !== '') {
      router.push('/main/search/suggestions')
    }
  }

  switchRouter()
}
</script>

<template>
  <div class="main-search">
    <header class="header-search">
      <div class="container">
        <input
          ref="search"
          v-model="articleSearchStore.searchValue"
          type="text"
          class="edit"
          :class="{'-transparent': !isSearching}"
          @focus="handleSearchFocus"
          @blur="handleSearchBlur"
          @input="hancleSearchInput"
        >

        <Transition name="clear">
          <div
            v-show="isSearching"
            class="slot-clear"
            @mousedown.prevent="handleClearMouseDown"
          >
            <IconClose class="icon1" />
          </div>
        </Transition>

        <div
          class="placeholder"
          :class="{'-shrunken': isSearching}"
          @click="handleHeaderPlaceholderClick"
        >
          <IconSearch class="icon" />

          <Transition
            name="shrink"
            @after-leave="onPlaceholderAfterLeave"
          >
            <span
              v-show="!isSearching"
              class="slot-placeholder-text"
            >搜索</span>
          </Transition>
        </div>
      </div>
    </header>

    <RouterView>
      <template #default="{Component, route}">
        <Transition
          :name="route.meta.transition3"
        >
          <Suspense
            v-if="Component"
          >
            <component :is="Component" />
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<style lang="postcss" scoped>
.main-search {
  display: block flex;
  width: 100%;
  height: calc(100vh - 110px);
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
}

.header-search {
  display: block flex;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-color);

  & > .container {
    position: relative;
    width: 640px;
    height: 78px;
    box-sizing: border-box;
    padding-right: 48px;
    padding-left: 48px;
    background-color: rgb(255 255 255 / 20%);
    border-radius: 38px;

    & > .edit {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-right: 30px;
      padding-left: 30px;
      border: none;
      margin: 0;
      background-color: transparent;
      color: white;
      font-size: 30px;
      transition: color 0.25s linear 0s;

      &:focus {
        outline: none;
      }

      &.-transparent {
        color: transparent;
      }
    }

    & > .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      display: block flex;
      overflow: hidden;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      border-radius: inherit;
      border-radius: 38px;
      color: white;
      transition: width 0.25s linear 0s;

      &.-shrunken {
        width: 78px;
      }

      & > .icon {
        flex-shrink: 0;
        font-size: 30px;
      }
    }
  }
}

.slot-clear {
  position: absolute;
  top: 0;
  right: 0;
  display: block flex;
  width: 78px;
  height: 100%;
  align-items: center;
  justify-content: center;

  & > .icon1 {
    color: white;
    font-size: 30px;
  }
}

.slot-placeholder-text {
  overflow: hidden;
  max-width: 2em;
  font-size: 30px;
  white-space: nowrap;
}

/* vue transition class */
.clear-enter-active {
  transition: transform 0.25s ease-out 0s;
}

.clear-leave-active {
  transition: transform 0.25s ease-in 0s;
}

.clear-enter-from {
  transform: scale(0);
}

.clear-leave-to {
  transform: scale(0);
}

.shrink-enter-active {
  transition: opacity 0.25s linear 0s, max-width 0.25s linear 0s;
}

.shrink-leave-active {
  transition: opacity 0.25s linear 0s, max-width 0.25s linear 0s;
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
