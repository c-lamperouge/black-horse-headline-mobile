import { defineStore } from 'pinia'
import { getHistories } from '@stores/dBStoreArticleSearch'

type Id = 'articleSearch'

interface History {
  id: number
  content: string
}
interface State {
  searchValue: string
  histories: Array<History>
}

interface Acttions {
  loadHistories(): Promise<void>
  addHistory(history: History): void
  deleteHistory(index: number): void
  emptyHistories(): void
}

const useStore = defineStore<Id, State, {}, Acttions>('articleSearch', {
  state: () => ({
    searchValue: '',
    histories: []
  }),

  actions: {
    async loadHistories () {
      this.emptyHistories()

      const temp = await getHistories()
      temp.forEach(value => {
        this.histories.push({
          id: Date.now(),
          content: value
        })
      })
    },

    addHistory (history) {
      this.histories.push(history)
    },

    deleteHistory (index) {
      this.histories.splice(index, 1)
    },

    emptyHistories () {
      this.histories.splice(0, this.histories.length)
    }
  }
})

export {
  useStore
}
