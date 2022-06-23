<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { autoGetChannelRecommendArticles } from '@network/logic/autoGetChannelRecommendArticls'
import type { Data } from '@network/logic/autoGetChannelRecommendArticls'
import { match } from 'ts-pattern'
import ArticleItem from '@views/main/articleList/ArticleItem.vue'

interface ComponentProperties {
  channelId: string
  page?: number
  eachPageCount?: number
}
const props = defineProps<ComponentProperties>()

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

onBeforeMount(async () => {
  match(await autoGetChannelRecommendArticles(props.channelId, Date.now()))
    .with({ responseType: 'success' }, async result => {
      const data: Data = await result.lastContent().json()
      data.data.results.forEach(value => {
        articles.push({
          id: parseInt(value.art_id),
          title: value.title,
          authorId: parseInt(value.aut_id),
          author: value.aut_name,
          commentsCount: parseInt(value.comm_count),
          publishDate: new Date(value.pubdate),
          cover: {
            type: value.cover.type,
            urls: value.cover.images
          }
        })
      })
    })
    .otherwise(result => {
      console.log(result.responseResultQueue)
    })
})
</script>

<template>
  <div class="article-list">
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<style scoped lang="postcss">
.article-list {
  display: block flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
}
</style>
