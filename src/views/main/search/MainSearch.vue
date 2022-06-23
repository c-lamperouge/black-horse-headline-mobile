<script setup lang="ts">
import { $ref } from 'vue/macros'
import IconSearch from '~icons/ic/baseline-search'
import IconClose from '~icons/ic/baseline-close'
import { RouterView } from 'vue-router'

// about header element
const search = $ref<HTMLInputElement | null>(null)
const onPlaceholderAfterLeave = () => {
  search?.focus()
}

let isSearching = $ref(false)
const handleHeaderPlaceholderClick = () => {
  isSearching = true
}

// eslint-disable-next-line prefer-const
let searchValue = $ref('')
const handleSearchFocus = () => {
  isSearching = true
}
const handleSearchBlur = () => {
  isSearching = false
  searchValue = ''
}

const handleClearMouseDown = () => {
  searchValue = ''
}
</script>

<template>
  <div class="main-search">
    <header class="header-search">
      <div class="container">
        <input
          ref="search"
          v-model="searchValue"
          type="text"
          class="edit"
          @focus="handleSearchFocus"
          @blur="handleSearchBlur"
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
      <template #default="{Component}">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </template>
    </RouterView>
  </div>
</template>

<style lang="postcss" scoped>
.main-search {
  display: block flex;
  width: 100%;
  height: calc(100vh - 100px);
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  box-shadow: 0 0 12px rgb(0 0 0 / 50%);
}

.header-search {
  display: block flex;
  height: 82px;
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
      width: 584px;
      height: 100%;
      box-sizing: border-box;
      padding: 0;
      border: none;
      margin-right: 32px;
      margin-left: 32px;
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
      display: block flex;
      overflow: hidden;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      border-radius: inherit;
      color: white;
      transition: width 0.25s linear 0s;

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

.slot-clear {
  position: absolute;
  top: 0;
  right: 0;
  display: block flex;
  width: 64px;
  height: 100%;
  align-items: center;
  justify-content: center;

  & > .icon1 {
    color: white;
    font-size: 32px;
  }
}

.slot-placeholder-text {
  overflow: hidden;
  max-width: 2em;
  font-size: 28px;
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
