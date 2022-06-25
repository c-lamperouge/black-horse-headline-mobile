<script setup lang="ts">
import { reactive } from 'vue'
import ArticleItem from '@views/main/articleList/ArticleItem.vue'
import { getSearchArticle } from '@network/requests/getSearchArticle'
import type { Data } from '@network/requests/getSearchArticle'
import { match } from 'ts-pattern'
import { useStore } from '@stores/articleSearch'

// store
const articleSearchStore = useStore()

interface Article {
  id: number
  title: string
  authorId: number
  author: string
  commentsCount: number
  publishDate: Date
  cover: {
    type: 0 | 1 | 3
    urls: string[]
  }
}
const articles: Array<Article> = reactive([])

try {
  const searchValue = articleSearchStore.searchValue
  if (searchValue.trim() !== '') {
    match(await getSearchArticle(searchValue, 1, 10))
      .with({ responseType: 'success' }, async result => {
        const data: Data = await result.responseContent.json()
        data.data.results.forEach(item => {
          articles.push({
            id: parseInt(item.art_id),
            title: item.title,
            authorId: parseInt(item.aut_id),
            author: item.aut_name,
            commentsCount: parseInt(item.comm_count),
            publishDate: new Date(item.pubdate),
            cover: {
              type: parseInt(item.cover.type) as 0 | 1 | 3,
              urls: item.cover.images
            }
          })
        })
      })
      .otherwise(result => {
        console.error(result)
      })
  }
} catch (e) {
  console.error(e)
}
</script>

<template>
  <div class="search-result">
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<style scoped lang="postcss">
.search-result {
  width: 100%;
  flex: 1;
  overflow-y: auto;
}
</style>
