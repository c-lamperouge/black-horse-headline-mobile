<script setup lang="ts">
import { reactive } from 'vue'
import { match } from 'ts-pattern'
import { getRecommendChannels } from '@network/requests/getRecommendChannels'
import type { Data } from '@network/requests/getRecommendChannels'
import IconAdd from '~icons/ic/baseline-add'

// base
interface ComponentProperties {
  isEditing: boolean
}
const props = defineProps<ComponentProperties>()

type Channels = Array<{
  id: string
  name: string
}>
const channels: Channels = reactive([])

// network request
const requestResult = await getRecommendChannels()
match(requestResult)
  .with({ responseType: 'success' }, async result => {
    const data: Data = await result.responseContent.json()
    data.data.channels.forEach(channel => {
      channels.push(channel)
    })
  })
  .otherwise(result => {
    console.error(result)
  })
</script>

<template>
  <div class="channel-list">
    <div
      v-for="channel in channels"
      :key="channel.id"
      class="item"
    >
      {{ channel.name }}

      <div
        v-show="props.isEditing"
        class="delete"
      >
        <IconAdd class="icon" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
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
</style>
