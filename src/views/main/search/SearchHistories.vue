<script setup lang="ts">
import { $ref } from 'vue/macros'
import IconDelete from '~icons/ic/baseline-delete'
import IconCheck from '~icons/ic/baseline-check'
import IconClose from '~icons/ic/baseline-close'
import { useStore } from '@stores/articleSearch'
import { useRouter } from 'vue-router'

// store
const articleSearchStore = useStore()
try {
  await articleSearchStore.loadHistories()
} catch (e) {
  console.error(e)
}

// delete history
let isDeleting = $ref(false)
const handleDeleteIconClick = () => {
  if (isDeleting) {
    articleSearchStore.clearHistories()
    isDeleting = false
  } else {
    isDeleting = true
  }
}
const finishDeleting = () => {
  isDeleting = false
}

const router = useRouter()
const handleHistoryItemClick = (historyContent: string) => {
  articleSearchStore.searchValue = historyContent
  router.push('/main/search/result')
}

const deleteHistory = (index: number) => {
  console.log(`delete index ${index}`)
  articleSearchStore.deleteHistory(index)
}
</script>

<template>
  <div class="search-history">
    <h3 class="search-heading">
      <span>搜索历史</span>

      <div class="right">
        <div
          class="delete1"
          @click="handleDeleteIconClick"
        >
          <IconDelete class="icon1" />
        </div>

        <div
          v-show="isDeleting"
          class="finish"
          @click="finishDeleting"
        >
          <IconCheck class="icon2" />
        </div>
      </div>
    </h3>

    <TransitionGroup
      name="list"
      tag="ul"
      class="history-list"
    >
      <li
        v-for="(history, index) in articleSearchStore.histories"
        :key="history.timeStamp"
        class="item"
        @click="handleHistoryItemClick(history.content)"
      >
        <span>{{ history.content }}</span>

        <div
          v-show="isDeleting"
          class="delete2"
          @click.stop="deleteHistory(index)"
        >
          <IconClose class="icon3" />
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="postcss">
.search-history {
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  padding-right: 22px;
  padding-left: 22px;
  overflow-y: auto;
}

.search-heading {
  display: block flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
  font-weight: normal;

  & > .right {
    display: block flex;
    width: 102px;
    justify-content: flex-end;
    gap: 22px;

    & > .delete1 {
      display: block flex;
      width: 40px;
      height: 40px;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s linear 0s;

      &:active {
        background-color: hsl(0deg 0% 85%);
      }
    }

    & > .finish {
      display: block flex;
      width: 40px;
      height: 40px;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s linear 0s;

      &:active {
        background-color: hsl(0deg 0% 85%);
      }
    }
  }
}

.history-list {
  position: relative;
  display: block flex;
  flex-flow: column;
  padding: 0;
  margin: 0;
  gap: 22px;
  list-style-type: none;

  & > .item {
    display: block flex;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    flex: 0 0 80px;
    align-items: center;
    justify-content: space-between;
    padding-right: 22px;
    padding-left: 22px;
    background-color: #f4f5f6;
    border-radius: 6px;

    & > .delete2 {
      display: block flex;
      width: 40px;
      height: 40px;
      align-items: center;
      justify-content: center;

      & > .icon3 {
        font-size: 32px;
      }
    }
  }
}

.list-move {
  transition: transform 0.25s ease-in 0s;
}

.list-enter-active {
  transition: transform 0.25s ease-out 0s, opacity 0.25s linear 0s;
}

.list-leave-active {
  position: absolute;
  transform: none;
  transition: transform 0.25s ease-in 0s, opacity 0.25s linear 0s;
}

.list-enter-from {
  opacity: 0;
}

.list-leave-to {
  opacity: 0;
}
</style>
