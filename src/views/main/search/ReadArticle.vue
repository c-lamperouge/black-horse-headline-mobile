<script setup lang="ts">
import { $ref } from 'vue/macros'
import IconClose from '~icons/ic/baseline-close'
import IconStar from '~icons/ic/round-star'
import IconStarBorder from '~icons/ic/round-star-border'
import { autoGetArticleDetails } from '@network/logic/autoGetArticleDetails'
import type { Data } from '@network/logic/autoGetArticleDetails'
import { match } from 'ts-pattern'

interface ComponentProperties {
  id: number
}
const props = defineProps<ComponentProperties>()

interface ComponentEmits {
  (e: 'close'): void
}
const emit = defineEmits<ComponentEmits>()

// request
try {
  match(await autoGetArticleDetails(props.id))
    .with({ responseType: 'success' }, async result => {
      const data: Data = await result.lastContent().json()
      console.log(data)
    })
    .otherwise(result => {
      console.error(result)
    })
} catch (e) {
  console.error(e)
}

// handle
const closeOverlay = () => {
  emit('close')
}

let isFavoriteStored = $ref(false)
const handleIconStarBorderClick = () => {
  isFavoriteStored = true
}
const handleIconStarClick = () => {
  isFavoriteStored = false
}
</script>

<template>
  <div
    class="read-article"
  >
    <div class="row-top">
      <span
        class="close"
      >
        <IconClose
          class="icon"
          @click="closeOverlay"
        />
      </span>

      <div class="title">
        article title
      </div>

      <span class="star">

        <IconStar
          v-if="isFavoriteStored"
          class="icon"
          @click="handleIconStarClick"
        />

        <IconStarBorder
          v-else
          class="icon"
          @click="handleIconStarBorderClick"
        />
      </span>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.read-article {
  display: block flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
}

.row-top {
  display: block flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 12px 22px;
  margin-bottom: 8px;
  box-shadow: var(--shadow-separate);

  & > .close {
    display: block flex;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: #ddd;
    }

    & > .icon {
      color: #222;
      font-size: 48px;
      vertical-align: middle;
    }
  }

  & > .title {
    overflow: hidden;
    max-width: 500px;
    font-size: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > .star {
    display: block flex;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: #ddd;
    }

    & > .icon {
      color: #222;
      font-size: 48px;
      vertical-align: middle;
    }
  }
}
</style>
