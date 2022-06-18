<script setup lang="ts">
import { $ref } from 'vue/macros'
import { computed } from 'vue'
import { useStore } from '@stores/app'
import { openAppDB } from '@stores/openDB'
import { useRouter } from 'vue-router'
import { match } from 'ts-pattern'
import IconVerificationCode from '~icons/custom/verificationCode'
import IconPhone from '~icons/custom/phone'
import BodyOverlay from '@components/BodyOverlay.vue'
import TheLoadingSlot from './TheLoadingSlot.vue'
import ThePhoneNumberInvalidSlot from './ThePhoneNumberInvalidSlot.vue'
import TheVerificationCodeInvalid from './TheVerificationCodeInvalidSlot.vue'
import TheSendVerificationSuccessfullySlot from './TheSendVerificationSuccessfullySlot.vue'
import { getVerificationCode } from '@network/requests/getVerificationCode'
import { login, Data } from '@network/logic/login'

// eslint-disable-next-line prefer-const
let phoneNumber = $ref('')
let isPhoneNumberValid = $ref(true)
// eslint-disable-next-line prefer-const
let verificationCode = $ref('')
let isVerificationCodeValid = $ref(true)

const validatePhoneNumber = () => {
  const regExp = /^1[35789]\d{9}$/

  if (regExp.test(phoneNumber)) {
    isPhoneNumberValid = true
  } else {
    isPhoneNumberValid = false
  }
}

const validateVerificationCode = () => {
  const regExp = /^\d{6}$/

  if (regExp.test(verificationCode)) {
    isVerificationCodeValid = true
  } else {
    isVerificationCodeValid = false
  }
}

// handle overlay slot dynamic component switch
let isShowOverlay = $ref(false)
const enum OverlaySlotComponent {
  Loading,
  PhoneNumberInvalid,
  VerificationCodeInvalid,
  SendVerificationSuccessfully,
}
let currentOverlaySlot = $ref(OverlaySlotComponent.Loading)
const overlaySlotComponent = computed(() => {
  switch (currentOverlaySlot) {
    case OverlaySlotComponent.Loading:
      return TheLoadingSlot
    case OverlaySlotComponent.PhoneNumberInvalid:
      return ThePhoneNumberInvalidSlot
    case OverlaySlotComponent.VerificationCodeInvalid:
      return TheVerificationCodeInvalid
    case OverlaySlotComponent.SendVerificationSuccessfully:
      return TheSendVerificationSuccessfullySlot
    default:
      return TheLoadingSlot
  }
})

// handle send verification code button click
const handleSendVerificationClick = async () => {
  validatePhoneNumber()
  if (!isPhoneNumberValid) {
    isShowOverlay = true
    currentOverlaySlot = OverlaySlotComponent.PhoneNumberInvalid
    return
  }

  disableSendVerificationButtion()

  match(await getVerificationCode(phoneNumber))
    .with({ responseType: 'success' }, async result => {
      const data: Data = await result.responseContent.json()
      console.log(data)
      isShowOverlay = true
      currentOverlaySlot = OverlaySlotComponent.SendVerificationSuccessfully
    })
    .otherwise(() => {
      console.error('getVerificationCode failed')
    })
}

// getVerificationCode button countdown transform
let sendVerificationButtonContent = $ref('获取验证码')
let isDisableVerificationButton = $ref(false)

const disableSendVerificationButtion = () => {
  isDisableVerificationButton = true
  sendVerificationButtonContent = '剩余60秒'
  let count = 60

  const countdown = setInterval(() => {
    count -= 1
    if (count <= 0) {
      sendVerificationButtonContent = '获取验证码'
      isDisableVerificationButton = false
      clearInterval(countdown)
    } else {
      sendVerificationButtonContent = `剩余${count}秒`
    }
  }, 1000)
}

// handle login button click
const appStore = useStore()
const router = useRouter()
const handleLoginClick = async () => {
  validatePhoneNumber()
  if (!isPhoneNumberValid) {
    isShowOverlay = true
    currentOverlaySlot = OverlaySlotComponent.PhoneNumberInvalid
    return
  }

  validateVerificationCode()
  if (!isVerificationCodeValid) {
    isShowOverlay = true
    currentOverlaySlot = OverlaySlotComponent.VerificationCodeInvalid
    return
  }

  isShowOverlay = true
  currentOverlaySlot = OverlaySlotComponent.Loading

  match(await login(phoneNumber, verificationCode))
    .with({ responseType: 'success' }, async result => {
      console.log(result.responseResultQueue)
      const data = await result.lastContent().json()
      await updateStoreAuthorization(data)

      appStore.login()
      isShowOverlay = false
      router.push({
        name: 'main-account'
      })
    })
    .otherwise(result => {
      console.log(result.responseResultQueue)
    })
}

const updateStoreAuthorization = async (data: Data) => {
  const db = await openAppDB()
  const transaction = db.transaction('userInformation', 'readwrite')
  transaction.store.put(data.data.id, 'id')
  transaction.store.put(data.data.name, 'name')
  transaction.store.put(data.data.photo, 'avatarUrl')
  transaction.store.put(data.data.intro, 'introduction')
  transaction.store.put(Boolean(data.data.is_media), 'isWeMedia')
  transaction.store.put(data.data.ceti, 'certification')
  transaction.store.put(data.data.art_count, 'articleCount')
  transaction.store.put(data.data.fans_count, 'fansCount')
  transaction.store.put(data.data.follow_count, 'followerCount')
  transaction.store.put(data.data.like_count, 'likeCount')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()
}
</script>

<template>
  <div class="block-container">
    <nav>登录</nav>

    <main>
      <div
        class="row"
        :class="{'-invalid': !isPhoneNumberValid}"
      >
        <IconPhone class="icon-block" />

        <input
          v-model.number="phoneNumber"
          class="phone-number"
          :class="{'-invalid': !isPhoneNumberValid}"
          type="number"
          placeholder="请输入手机号"
          @blur="validatePhoneNumber"
        >
      </div>

      <div
        class="row"
        :class="{'-invalid': !isVerificationCodeValid}"
      >
        <IconVerificationCode class="icon-block" />

        <input
          v-model.trim="verificationCode"
          class="verification-code"
          :class="{'-invalid': !isVerificationCodeValid}"
          type="password"
          placeholder="请输入验证码"
          maxlength="6"
          @blur="validateVerificationCode"
        >

        <span class="separator" />

        <button
          class="send-verification-code"
          :disabled="isDisableVerificationButton"
          @click="handleSendVerificationClick"
        >
          {{ sendVerificationButtonContent }}
        </button>
      </div>

      <div class="blank">
        <button
          class="login-button"
          @click="handleLoginClick"
        >
          登录
        </button>

        <span class="privacy-policy">隐私条款</span>
      </div>
    </main>

    <BodyOverlay
      v-model="isShowOverlay"
    >
      <component
        :is="overlaySlotComponent"
        v-model="isShowOverlay"
      />
    </BodyOverlay>
  </div>
</template>

<style lang="postcss" scoped>
.block-container {
  display: block flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

nav {
  display: block flex;
  width: 100%;
  height: 77px;
  align-items: center;
  justify-content: center;
  background-color: #3296fa;
  color: white;
  font-size: 32px;
}

.icon-block {
  width: 26px;
  height: 40px;
  margin-right: 38px;
  margin-left: 10px;
}

main {
  display: block flex;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  flex-direction: column;
  align-items: center;

  & > .row {
    position: relative;
    display: block flex;
    width: 100%;
    height: 90px;
    box-sizing: border-box;
    align-items: center;
    padding-right: 32px;
    padding-left: 32px;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: block flow;
      width: 12px;
      height: 100%;
      background-color: hsl(354deg 70% 54% / 50%);
      content: "";
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s linear 0s;
    }

    &.-invalid {
      color: hsl(354deg 70% 54%);

      &::after {
        transform: scaleX(1);
      }
    }

    & > input {
      height: 100%;
      box-sizing: border-box;
      flex: 1;
      border: none;
      font-size: 26px;

      &::placeholder {
        color: #c0c0c0;
      }

      &:focus {
        outline: none;
      }

      &.-invalid {
        caret-color: hsl(354deg 70% 54%);
        color: hsl(354deg 70% 54%);
      }
    }

    & > .separator {
      display: inline flow-root;
      width: 2px;
      height: 46px;
      margin-right: 20px;
      margin-left: 20px;
      background-color: #eee;
    }
  }

  & > .row + .row {
    border-top: 2px solid #eee;
  }

  & > .blank {
    display: block flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f7f9;
  }
}

.send-verification-code {
  width: 152px;
  height: 46px;
  border: none;
  background-color: #ededed;
  border-radius: 23px;
  color: #666;
  font-size: 22px;
  transition: background-color 0.25s linear 0s;

  &:focus {
    outline: none;
  }

  &:active {
    background-color: hsl(0deg 0% 80%);
  }

  &:disabled {
    background-color: hsl(0deg 0% 80%);
  }
}

.login-button {
  width: 694px;
  height: 88px;
  border: none;
  margin-top: 53px;
  appearance: none;
  background-color: #6db4fb;
  border-radius: 10px;
  color: white;
  font-size: 30px;
  transition: background-color 0.25s linear 0s;

  &:focus {
    outline: none;
  }

  &:active {
    background-color: hsl(210deg 95% 59%);
  }
}

.privacy-policy {
  margin-bottom: 52px;
  color: #666;
  font-size: 25px;
}
</style>
