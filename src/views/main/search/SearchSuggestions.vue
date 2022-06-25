<script setup lang="ts">
import { reactive, watchEffect, onDeactivated } from 'vue'
import { useStore } from '@stores/articleSearch'
import { useRouter } from 'vue-router'
import { getSearchSuggestions } from '@network/requests/getSearchSuggestions'
import type { Data } from '@network/requests/getSearchSuggestions'
import { match } from 'ts-pattern'
import { debounce } from '@util/debounce'
import IconLabel from '~icons/ic/round-label'

// store
const articleSearchStore = useStore()

const suggestions: string[] = reactive([])

const requestSearchSuggestions = debounce(async (keyword: string) => {
  if (keyword === '') {
    suggestions.splice(0, suggestions.length)
  } else {
    match(await getSearchSuggestions(keyword))
      .with({ responseType: 'success' }, async result => {
        const data: Data = await result.responseContent.json()

        // here logic is weird because options will be [null] if have no match item
        const matchItems = data.data.options
        if (matchItems.at(0) !== null) {
          suggestions.splice(0, suggestions.length, ...matchItems)
        } else {
          suggestions.splice(0, suggestions.length)
        }
      })
      .otherwise(result => {
        console.log(result)
      })
  }
}, 750)

watchEffect(() => {
  requestSearchSuggestions(articleSearchStore.searchValue)
})

onDeactivated(() => {
  suggestions.splice(0, suggestions.length)
})

// highlight keyword
const suggestion2SpanList = (s: string) => {
  const keyword = articleSearchStore.searchValue

  const spanList: Array<{
    className: string
    content: string
  }> = []
  s.split(keyword).forEach(item => {
    spanList.push({
      className: 'normal',
      content: item
    })
    spanList.push({
      className: 'highlight',
      content: keyword
    })
  })
  spanList.pop()

  return spanList
}

// event handle
const router = useRouter()
const handleSuggestionClick = (suggestion: string) => {
  articleSearchStore.searchValue = suggestion
  router.push('/main/search/result')
  try {
    articleSearchStore.addHistory(suggestion)
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="search-suggestions">
    <ul
      class="suggestion-list"
    >
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="item"
        @click="handleSuggestionClick(suggestion)"
      >
        <IconLabel class="icon" />

        <span
          v-for="(span, index2) in suggestion2SpanList(suggestion)"
          :key="index2"
          :class="span.className"
        >{{ span.content }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="postcss">
.search-suggestions {
  width: 100%;
  flex: 1;
  overflow-y: auto;
}

.suggestion-list {
  display: block flex;
  flex-flow: column;
  padding: 0;
  margin: 0;
  list-style-type: none;

  & > .item {
    display: block flex;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    flex: 0 0 80px;
    align-items: center;
    justify-content: flex-start;
    padding-right: 22px;
    padding-left: 22px;
    border-bottom: 2px solid hsl(0deg 0% 90%);
    background-color: white;
    border-radius: 6px;
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: hsl(var(--theme-hue) 40% 95%);
    }

    & > .icon {
      margin-right: 16px;
      color: hsl(var(--theme-hue) 40% 90%);
      font-size: 36px;
    }

    & > .normal {
      font-size: 32px;
    }

    & > .highlight {
      color: var(--theme-color);
      font-size: 32px;
    }
  }
}
</style>
