<script setup lang="ts">
import ArticleItem from '@views/main/articleList/ArticleItem.vue'

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
interface ComponentProperties {
  articles: Array<Article>
}
const props = defineProps<ComponentProperties>()
</script>

<template>
  <div class="article-list">
    <ArticleItem
      v-for="article in props.articles"
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
