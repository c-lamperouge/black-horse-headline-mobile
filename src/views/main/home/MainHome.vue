<script setup lang="ts">
// for vue
import { nextTick, reactive, watch } from 'vue'
import { $ref, $$ } from 'vue/macros'
// for handle network request
import { match } from 'ts-pattern'
import { autoGetUserChannels } from '@network/logic/autoGetUserChannels'
import type { Data as ChannelsData } from '@network/logic/autoGetUserChannels'
// for edit channel component
import IconMenu from '~icons/ic/round-menu'
import BodyOverlay from '@/components/BodyOverlay.vue'
import EditChannel from '@views/main/home/EditChannel.vue'
// for article list component
import { autoGetChannelRecommendArticles } from '@network/logic/autoGetChannelRecommendArticls'
import type { Data as ArticlesData } from '@network/logic/autoGetChannelRecommendArticls'
import ArticleListLoading from '@views/main/articleList/ArticleListLoading.vue'
import ArticleItem from '@views/main/articleList/ArticleItem.vue'
import ArticleItemRefresh from '@views/main/articleList/ArticleItemRefresh.vue'
import ArticleItemLoadMore from '@views/main/articleList/ArticleItemLoadMore.vue'
import { animationFrameThrottle, throttle } from '@util/throttle'
// for read article
import ReadArticle from '@views/main/search/ReadArticle.vue'
import ReadArticleLoading from '@views/main/search/ReadArticleLoading.vue'

// async request user channels
interface Channel {
  id: string
  name: string
}
const channels: Array<Channel> = reactive([])
match(await autoGetUserChannels())
  .with({ responseType: 'success' }, async result => {
    const data: ChannelsData = await result.lastContent().json()
    data.data.channels.forEach(channel => {
      channels.push({
        id: channel.id.toString(),
        name: channel.name
      })
    })
    activeChannelId = channels.at(0)?.id ?? null
  })
  .otherwise(result => {
    console.log(result.responseResultQueue)
  })

// about channel edit
let isShowEditChannel = $ref(false)
const showEditChannel = () => {
  isShowEditChannel = true
}
const closeEditChannel = () => {
  isShowEditChannel = false
}
// about read article
let readArticleId = $ref(0)
let isShowReadArticle = $ref(false)
const showReadArticle = (id: number) => {
  readArticleId = id
  isShowReadArticle = true
}
const closeReadArticle = () => {
  isShowReadArticle = false
}

// according to active channel id to update article list
let activeChannelId = $ref<string | null>(null)
let isShowArticleListLoading = $ref(false)
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
const articleListEl = $ref<HTMLDivElement | null>(null)
const articles: Array<Article> = reactive([])
// channel cache
const channelCache = new Map<string, {
  articles: Array<Article>
  timeStamps: Array<number>
  scrollTop: number
}>()
watch($$(activeChannelId), async (newValue) => {
  if (newValue !== null) {
    const cache = channelCache.get(newValue)
    if (cache !== undefined) {
      articles.splice(0, articles.length, ...cache.articles)
      nextTick(() => {
        articleListEl?.scrollTo({
          top: cache.scrollTop
        })
      })
    } else {
      isShowArticleListLoading = true
      const currentTimeStamp = Date.now()
      match(await autoGetChannelRecommendArticles(newValue, currentTimeStamp))
        .with({ responseType: 'success' }, async result => {
          const data: ArticlesData = await result.lastContent().json()
          const newArticles = data.data.results.map(value => ({
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
          }))
          channelCache.set(newValue, {
            articles: newArticles,
            timeStamps: [currentTimeStamp, data.data.pre_timestamp],
            scrollTop: 0
          })
          articles.splice(0, articles.length, ...newArticles)
          // not need to set scrollTop = 0
        })
        .otherwise(result => {
          console.log(result.responseResultQueue)
        })
      isShowArticleListLoading = false
    }
  }
})

// event handle
const handleChannelClick = (channel: Channel) => {
  activeChannelId = channel.id
}

const handleArticleListScroll = animationFrameThrottle((e: Event) => {
  const scrollTop = (e.target as HTMLDivElement).scrollTop
  channelCache.get(activeChannelId!)!.scrollTop = scrollTop
})

// for article list slide up to lazy load more articles
const handleArticleListWheel = (e: WheelEvent) => {
  if (articleListEl) {
    // temporary assume device is natural scroll
    if (articleListEl.scrollTop === 0) {
      if (e.deltaY < 0) {
        handleRefresh()
      }
    } else if (Math.abs(articleListEl.scrollHeight - articleListEl.clientHeight - articleListEl.scrollTop) < 1) {
      if (e.deltaY > 0) {
        handleLoadMore()
      }
    }
  }
}

let isShowArticleItemRefresh = $ref(false)
// max refresh once in 10 seconds
const handleRefresh = throttle(async () => {
  if (!isShowArticleItemRefresh) {
    isShowArticleItemRefresh = true

    if (activeChannelId !== null) {
      const currentTimeStamp = Date.now()
      match(await autoGetChannelRecommendArticles(activeChannelId, currentTimeStamp))
        .with({ responseType: 'success' }, async result => {
          const data: ArticlesData = await result.lastContent().json()
          const newArticles = data.data.results.map(value => ({
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
          }))
          channelCache.set(activeChannelId!, {
            articles: newArticles,
            timeStamps: [currentTimeStamp, data.data.pre_timestamp],
            scrollTop: 0
          })
          articles.splice(0, articles.length, ...newArticles)

          isShowArticleItemRefresh = false
        })
        .otherwise(result => {
          console.log(result.responseResultQueue)
        })
    }
  }
}, 10000)

let isShowArticleItemLoadMore = $ref(false)
const handleLoadMore = async () => {
  if (!isShowArticleItemLoadMore) {
    isShowArticleItemLoadMore = true

    if (activeChannelId !== null) {
      const activeChannelCache = channelCache.get(activeChannelId)!
      const timeStamps = activeChannelCache.timeStamps
      const peviousTimeStamp = timeStamps.at(timeStamps.length - 1) as number
      match(await autoGetChannelRecommendArticles(activeChannelId, peviousTimeStamp))
        .with({ responseType: 'success' }, async result => {
          const data: ArticlesData = await result.lastContent().json()
          const newArticles = data.data.results.map(value => ({
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
          }))
          newArticles.forEach(article => {
            activeChannelCache.articles.push(article)
            activeChannelCache.timeStamps.push(data.data.pre_timestamp)
            articles.push(article)
          })

          isShowArticleItemLoadMore = false
        })
        .otherwise(result => {
          console.log(result.responseResultQueue)
        })
    }
  }
}
</script>

<template>
  <div class="main-home">
    <Suspense>
      <div class="suspense-container">
        <nav class="channel-tab-bar">
          <div
            v-for="channel in channels"
            :key="channel.id"
            class="item"
            :class="{'-active': activeChannelId === channel.id}"
            @click="handleChannelClick(channel)"
          >
            <span class="title">{{ channel.name }}</span>
          </div>

          <div
            v-if="channels.length >= 4"
            class="menu"
            @click="showEditChannel"
          >
            <IconMenu class="icon1" />
          </div>
        </nav>

        <ArticleListLoading v-if="isShowArticleListLoading" />
        <div
          v-else
          ref="articleListEl"
          class="article-list"
          @scroll="handleArticleListScroll($event)"
          @wheel="handleArticleListWheel($event)"
        >
          <ArticleItemRefresh v-show="isShowArticleItemRefresh" />

          <ArticleItem
            v-for="article in articles"
            :key="article.id"
            :article="article"
            @click="showReadArticle(article.id)"
          />

          <ArticleItemLoadMore v-show="isShowArticleItemLoadMore" />
        </div>
      </div>
    </Suspense>

    <BodyOverlay
      v-model="isShowEditChannel"
      slot-transition-name="slide"
    >
      <EditChannel
        :channels="channels"
        @close="closeEditChannel"
      />
    </BodyOverlay>

    <BodyOverlay
      v-model="isShowReadArticle"
      slot-transition-name="slide"
    >
      <div class="transition-container">
        <Suspense>
          <ReadArticle
            :id="readArticleId"
            @close="closeReadArticle"
          />

          <template #fallback>
            <ReadArticleLoading />
          </template>
        </Suspense>
      </div>
    </BodyOverlay>
  </div>
</template>

<style lang="postcss" scoped>
.main-home {
  display: block flex;
  width: 100%;
  height: calc(100vh - 110px);
  flex-direction: column;
  background-color: white;
}

.suspense-container {
  display: block flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
}

.channel-tab-bar {
  display: block flex;
  width: 100%;
  height: 82px;
  box-sizing: border-box;
  flex-wrap: nowrap;
  padding: 12px;
  background-color: hsl(var(--theme-hue) 20% 95%);
  box-shadow: var(--shadow-layer);
  gap: 12px;
  overflow-x: auto;

  & > .item {
    display: block flex;
    box-sizing: border-box;
    flex: 0 0 174px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: white;
    }

    &.-active {
      background-color: white;
      box-shadow: var(--shadow-separate);
      color: var(--theme-color);
      font-weight: 500;
    }

    & > .title {
      font-size: 30px;
    }
  }

  & > .menu {
    display: block flex;
    flex: 0 0 58px;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 6px;
    box-shadow: var(--shadow-separate);
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: #f2f3f5;
    }

    & > .icon1 {
      font-size: 32px;
    }
  }
}

.article-list {
  display: block flex;
  flex: 1;
  flex-direction: column;
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
