import { defineStore } from 'pinia'

type Id = 'app'

interface State {
}

interface Acttions {
}

const useStore = defineStore<Id, State, {}, Acttions>('app', {
  state: () => ({
  }),

  actions: {
  }
})

export {
  useStore
}
