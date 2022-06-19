<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { $ref } from 'vue/macros'
import { openAppDB } from '@stores/openDB'
import IconFavorite from '~icons/custom/favorite'
import IconHistory from '~icons/custom/history'
import IconArrowRight from '~icons/ic/baseline-keyboard-arrow-right'

let name = $ref('')
let avatarUrl = $ref('')
let articleCount = $ref(0)
let followerCount = $ref(0)
let fansCount = $ref(0)
let likeCount = $ref(0)

const readStoreUserInformation = async () => {
  const db = await openAppDB()
  const transaction = db.transaction('userInformation')
  const storeName = await transaction.store.get('name')
  const storeAvatarUrl = await transaction.store.get('avatarUrl')
  const storeArticleCount = await transaction.store.get('articleCount')
  const storeFollowerCount = await transaction.store.get('followerCount')
  const storeFansCount = await transaction.store.get('fansCount')
  const storeLikeCount = await transaction.store.get('likeCount')
  transaction.done.then(() => {
    name = storeName as string
    avatarUrl = storeAvatarUrl as string
    articleCount = storeArticleCount as number
    followerCount = storeFollowerCount as number
    fansCount = storeFansCount as number
    likeCount = storeLikeCount as number
  }).catch(reason => {
    console.log(reason)
  })
}
onBeforeMount(readStoreUserInformation)
</script>

<template>
  <div class="block-container">
    <section class="base-information">
      <div class="character">
        <div class="left">
          <img
            :src="avatarUrl"
            alt="avatar"
            class="avatar"
          >

          <span class="name">{{ name }}</span>
        </div>

        <button>编辑资料</button>
      </div>

      <div class="count">
        <div class="item">
          <span class="number">{{ articleCount }}</span>
          <span class="field">头条</span>
        </div>

        <div class="item">
          <span class="number">{{ followerCount }}</span>
          <span class="field">关注</span>
        </div>

        <div class="item">
          <span class="number">{{ fansCount }}</span>
          <span class="field">粉丝</span>
        </div>

        <div class="item">
          <span class="number">{{ likeCount }}</span>
          <span class="field">获赞</span>
        </div>
      </div>
    </section>

    <section class="favorite-and-history">
      <div class="cell">
        <IconFavorite class="icon -favorite" />

        <span class="text">收藏</span>
      </div>

      <span class="separator" />

      <div class="cell">
        <IconHistory class="icon -history" />

        <span class="text">历史</span>
      </div>
    </section>

    <section class="function-list">
      <div class="row">
        <span class="text">消息通知</span>

        <IconArrowRight class="icon" />
      </div>

      <div class="separator" />

      <div class="row">
        <span class="text">小智同学</span>

        <IconArrowRight class="icon" />
      </div>
    </section>

    <section class="exit-login">
      退出登录
    </section>
  </div>
</template>

<style lang="postcss" scoped>
.block-container {
  display: block flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f5f7f9;
}

.base-information {
  display: block flex;
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 32px;
  background:
    url("../../assets/svg/MainAccountBaseInformationBackground.svg"),
    hsl(210deg 95% 59%);
  background-blend-mode: overlay;
  background-position: -5vw -30vw;
  background-repeat: no-repeat;
  background-size: 600px 460px;

  & > .character {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;

    & > .left {
      display: block flex;
      align-items: center;
      gap: 22px;

      & > .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid white;
        border-radius: 66px;
        object-fit: cover;
        vertical-align: middle;
      }

      & > .name {
        color: white;
        font-size: 30px;
      }
    }

    & > button {
      width: 130px;
      height: 44px;
      border: none;
      appearance: none;
      background-color: white;
      border-radius: 22px;
      color: #666;
      font-size: 24px;
      transition: background-color 0.25s linear 0s;

      &:focus {
        outline: none;
      }

      &:active {
        background-color: #f2f3f5;
      }
    }
  }

  & > .count {
    display: block flex;
    height: 80px;
    align-items: stretch;
    justify-content: space-evenly;
    color: white;

    & > .item {
      display: block flex;
      width: 80px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      &:nth-of-type(2) {
        margin-right: 40px;
      }

      &:nth-of-type(3) {
        margin-left: 40px;
      }

      & > .number {
        font-size: 36px;
      }

      & > .field {
        font-size: 24px;
      }
    }
  }
}

.favorite-and-history {
  display: flex;
  height: 140px;
  box-sizing: border-box;
  background-color: white;

  & > .cell {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: #f2f3f5;
    }

    & > .icon {
      width: 45px;
      height: 45px;

      &.-favorite {
        color: #eb5253;
      }

      &.-history {
        color: #ff9d1d;
      }
    }

    & > .text {
      color: #333;
      font-size: 28px;
    }
  }

  & > .separator {
    display: inline flow-root;
    width: 2px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-clip: content-box;
    background-color: #edeff3;
  }
}

.function-list {
  display: block flex;
  height: 202px;
  box-sizing: border-box;
  flex-direction: column;
  margin-top: 10px;
  background-color: white;

  & > .row {
    display: block flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding-right: 30px;
    padding-left: 30px;
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: #f2f3f5;
    }

    & > .text {
      color: #333;
      font-size: 30px;
    }

    & > .icon {
      color: #333;
      font-size: 36px;
    }
  }

  & > .separator {
    height: 2px;
    background-color: #edeff3;
  }
}

.exit-login {
  display: block flex;
  height: 100px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background-color: white;
  color: #d86262;
  font-size: 30px;
  transition: background-color 0.25s linear 0s;

  &:active {
    background-color: #f2f3f5;
  }
}
</style>
