<script setup lang="ts">
import IconClose from '~icons/ic/baseline-close'
interface ComponentProperties {
  article: {
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
}
// eslint-disable-next-line vue/no-setup-props-destructure
const { article } = defineProps<ComponentProperties>()

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const dayOfMonth = (date.getDate()).toString().padStart(2, '0')

  return `${year}年${month}月${dayOfMonth}日`
}
</script>

<template>
  <div class="article-item">
    <div class="top">
      <h3 class="title">
        {{ article.title }}
      </h3>

      <img
        v-if="article.cover.type === 1"
        class="cover"
        :src="article.cover.urls[0]"
        alt="picture"
      >
    </div>

    <div
      v-if="article.cover.type === 3"
      class="center"
    >
      <img
        v-for="url in article.cover.urls"
        :key="url"
        class="cover"
        :src="url"
        alt="picture"
      >
    </div>

    <div class="bottom">
      <span class="author">{{ article.author }}</span>

      <span class="comments">{{ article.commentsCount }}评论</span>

      <span class="date">{{ formatDate(article.publishDate) }}</span>

      <div class="close">
        <IconClose class="icon" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.article-item {
  display: block flex;
  flex: 1;
  flex-direction: column;
  padding-right: 25px;
  padding-bottom: 25px;
  padding-left: 25px;

  & + & {
    border-top: 1px solid #edeff3;
  }

  & > .top {
    display: block flex;

    & > .title {
      /* stylelint-disable-next-line value-no-vendor-prefix */
      display: -webkit-box;
      overflow: hidden;
      flex: 1;
      -webkit-box-orient: vertical;
      font-size: 32px;
      font-weight: normal;
      -webkit-line-clamp: 2;
      margin-block: 25px;
    }

    & > .cover {
      max-width: 232px;
      max-height: 146px;
      object-fit: cover;
      vertical-align: middle;
    }
  }

  & > .center {
    display: block flex;
    justify-content: space-between;
    margin-bottom: 25px;
    gap: 10px;

    & > .cover {
      max-width: 232px;
      max-height: 146px;
      flex: 1;
      object-fit: cover;
      vertical-align: middle;
    }
  }

  & > .bottom {
    display: block flex;
    align-items: center;
    gap: 48px;

    & > .author {
      color: #999;
      font-size: 24px;
    }

    & > .comments {
      color: #999;
      font-size: 24px;
    }

    & > .date {
      color: #999;
      font-size: 24px;
    }

    & > .close {
      display: block flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      & > .icon {
        color: #999;
        font-size: 24px;
      }
    }
  }
}

</style>
