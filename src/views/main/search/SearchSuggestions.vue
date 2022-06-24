<script setup lang="ts">
import { reactive, watchEffect, onDeactivated } from 'vue'
import { useStore } from '@stores/articleSearch'
import { getSearchSuggestions } from '@network/requests/getSearchSuggestions'
import type { Data } from '@network/requests/getSearchSuggestions'
import { match } from 'ts-pattern'
import { debounce } from '@util/debounce'

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
</script>

<template>
  <div class="search-suggestions">
    <TransitionGroup
      name="list"
      tag="ul"
      class="suggestion-list"
    >
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="item"
      >
        {{ suggestion }}
      </li>
    </TransitionGroup>
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
    justify-content: space-between;
    padding-right: 22px;
    padding-left: 22px;
    border-bottom: 2px solid #aaa;
    background-color: white;
    border-radius: 6px;
  }
}
</style>
