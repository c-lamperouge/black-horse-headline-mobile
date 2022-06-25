<script setup lang="ts">
import { $ref } from 'vue/macros'
import { reactive } from 'vue'
import ArticleItem from '@views/main/articleList/ArticleItem.vue'
import { getSearchArticle } from '@network/requests/getSearchArticle'
import type { Data } from '@network/requests/getSearchArticle'
import { match } from 'ts-pattern'
import { useStore } from '@stores/articleSearch'
import BodyOverlay from '@components/BodyOverlay.vue'
import ReadArticle from '@views/main/search/ReadArticle.vue'
import ReadArticleLoading from '@views/main/search/ReadArticleLoading.vue'

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

// overlay
let readArticleId = $ref(0)
let isShowOverlay = $ref(false)
// const readArticleTransitionName = $ref<string | undefined>('slide')

const handleArticleItemClick = (id: number) => {
  readArticleId = id
  isShowOverlay = true
}

const closeOverlay = () => {
  isShowOverlay = false
}
</script>

<template>
  <div class="search-result">
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
      @click="handleArticleItemClick(article.id)"
    />

    <BodyOverlay
      v-model="isShowOverlay"
      slot-transition-name="slide"
    >
      <div class="transition-container">
        <Suspense>
          <ReadArticle
            :id="readArticleId"
            @cancel="closeOverlay"
          />

          <template #fallback>
            <ReadArticleLoading />
          </template>
        </Suspense>
      </div>
    </BodyOverlay>
  </div>
</template>

<style scoped lang="postcss">
.search-result {
  width: 100%;
  flex: 1;
  overflow-y: auto;
}

.transition-container {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  display: block flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 24%);
}

/* vue transition class */
.slide-enter-active {
  transition: transform 0.25s ease-out 0s;
}

.slide-leave-active {
  transition: transform 0.25s ease-in 0s;
}

.slide-enter-from {
  transform: translateY(100%);
}

.slide-leave-to {
  transform: translateY(100%);
}
</style>
