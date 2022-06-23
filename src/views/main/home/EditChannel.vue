<script setup lang="ts">
import { $computed, $ref } from 'vue/macros'
import BodyOverlay from '@/components/BodyOverlay.vue'
import IconClose from '~icons/ic/baseline-close'
import RecommendChannelList from './RecommendChannelList.vue'
import ChannelListLoading from './ChannelListLoading.vue'

interface ComponentProperties {
  modelValue: boolean
  channels: Array<{
    id: number
    name: string
  }>
}
const props = defineProps<ComponentProperties>()

interface ComponentEmits {
  (e: 'update:modelValue', newValue: boolean): void
}
const emit = defineEmits<ComponentEmits>()

let isShowOverlay = $computed<boolean>({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})

const closeOverlay = () => {
  isShowOverlay = false
}

// edit state
let isEditing = $ref(false)

const switchEditState = () => {
  isEditing = !isEditing
}

const cancelEdit = () => {
  isEditing = false
}
</script>

<template>
  <BodyOverlay
    v-model="isShowOverlay"
  >
    <Transition name="slide">
      <div
        v-if="props.modelValue"
        class="edit-channel"
      >
        <div class="row-top">
          <span
            v-if="!isEditing"
            class="close"
          >
            <IconClose
              class="icon"
              @click="closeOverlay"
            />
          </span>

          <button
            v-show="isEditing"
            class="cancel"
            @click="cancelEdit"
          >
            取消
          </button>

          <button
            class="edit"
            @click="switchEditState"
          >
            {{ isEditing ? '完成' : '编辑' }}
          </button>
        </div>

        <section class="my-channels">
          <h3>我的频道</h3>

          <div class="channel-list">
            <div
              v-for="channel in props.channels"
              :key="channel.id"
              class="item"
            >
              {{ channel.name }}

              <div
                v-show="isEditing"
                class="delete"
              >
                <IconClose class="icon" />
              </div>
            </div>
          </div>
        </section>

        <section class="recommend-channels">
          <h3>频道推荐</h3>

          <Suspense>
            <RecommendChannelList :is-editing="isEditing" />

            <template #fallback>
              <ChannelListLoading />
            </template>
          </Suspense>
        </section>
      </div>
    </Transition>
  </BodyOverlay>
</template>

<style scoped lang="postcss">
.edit-channel {
  position: fixed;
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

.row-top {
  display: block flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 22px;

  & > .close {
    display: block flex;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: #ddd;
    }

    & > .icon {
      color: #222;
      font-size: 48px;
      vertical-align: middle;
    }
  }

  & > .cancel {
    width: 112px;
    height: 60px;
    border: 2px solid hsl(0deg 0% 60%);
    appearance: none;
    background-color: transparent;
    border-radius: 30px;
    color: hsl(0deg 0% 60%);
    font-size: 28px;

    &:focus {
      outline: none;
    }

    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: hsl(0deg 0% 95%);
    }
  }

  & > .edit {
    width: 112px;
    height: 60px;
    border: 2px solid #eb5253;
    appearance: none;
    background-color: transparent;
    border-radius: 30px;
    color: #eb5253;
    font-size: 28px;

    &:focus {
      outline: none;
    }

    transition: background-color 0.25s linear 0s;

    &:active {
      background-color: hsl(360deg 79% 90%);
    }
  }
}

.my-channels {
  padding-right: 22px;
  padding-left: 22px;

  & > h3 {
    font-size: 32px;
    font-weight: normal;
  }
}

.recommend-channels {
  padding-right: 22px;
  padding-left: 22px;

  & > h3 {
    font-size: 32px;
    font-weight: normal;
  }
}

.channel-list {
  display: block flex;
  flex-flow: row wrap;
  gap: 22px;

  & > .item {
    position: relative;
    height: 80px;
    flex: 0 0 160px;
    background-color: #f4f5f6;
    border-radius: 6px;
    line-height: 80px;
    text-align: center;

    & > .delete {
      position: absolute;
      top: -6px;
      right: -6px;
      display: block flex;
      width: 32px;
      height: 32px;
      align-items: center;
      justify-content: center;
      background-color: white;
      border-radius: 16px;
      box-shadow: 0 0 8px 0 rgb(0 0 0 / 24%);

      & > .icon {
        font-size: 16px;
      }
    }
  }
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
