<script setup lang="ts">
import IconPhone from '~icons/custom/phone'
import IconVerificationCode from '~icons/custom/verificationCode'

</script>

<template>
  <div class="block-container">
    <nav>登录</nav>

    <main>
      <div class="row">
        <IconPhone class="icon-block" />

        <input
          type="number"
          placeholder="请输入手机号"
        >
      </div>

      <div class="row">
        <IconVerificationCode class="icon-block" />

        <input
          type="password"
          placeholder="请输入验证码"
          maxlength="6"
        >

        <span class="separator" />

        <button class="send-verification-code">
          获取验证码
        </button>
      </div>

      <div class="blank">
        <button class="log-in">
          登录
        </button>

        <span class="privacy-policy">隐私条款</span>
      </div>
    </main>
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
    display: block flex;
    width: 100%;
    height: 90px;
    box-sizing: border-box;
    align-items: center;
    padding-right: 32px;
    padding-left: 32px;

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

  &:active {
    background-color: hsl(0deg 0% 80%);
  }
}

.log-in {
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
