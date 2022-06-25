import { defineStore } from 'pinia'
import {
  getHistories as dbGetHistories, addHistory as dbAddHistory,
  deleteHistory as dbDeleteHistory, clearHistories as dbClearHistories
} from '@stores/dBStoreArticleSearch'
import type { History } from '@stores/dBStoreArticleSearch'

type Id = 'articleSearch'

interface State {
  searchValue: string
  histories: Array<History>
}

interface Acttions {
  loadHistories(): Promise<void>
  addHistory(content: string): Promise<void>
  deleteHistory(index: number): Promise<void>
  clearHistories(): Promise<void>
}

const useStore = defineStore<Id, State, {}, Acttions>('articleSearch', {
  state: () => ({
    searchValue: '',
    histories: []
  }),

  actions: {
    async loadHistories () {
      const temp = await dbGetHistories()
      this.histories.splice(0, this.histories.length, ...temp)
    },

    async addHistory (content: string) {
      if (this.histories.find(item => item.content === content) === undefined) {
        const newHistory = {
          content,
          timeStamp: Date.now(),
          author: 'anonymous'
        }
        this.histories.push(newHistory)
        await dbAddHistory(newHistory)
      }
    },

    async deleteHistory (index) {
      // ahead preserve key for db delete
      const key = this.histories[index].content
      // should update pinia first, then async update db
      this.histories.splice(index, 1)
      await dbDeleteHistory(key)
    },

    async clearHistories () {
      this.histories.splice(0, this.histories.length)
      await dbClearHistories()
    }
  }
})

export {
  useStore
}
