import { defineStore } from 'pinia'

type Id = 'app'

interface State {
  isShowenFirstView: boolean
  isLoggedIn: boolean
}

interface Acttions {
  hideFirstView(): void
}

const useStore = defineStore<Id, State, {}, Acttions>('app', {
  state: () => ({
    isShowenFirstView: false,
    isLoggedIn: false
  }),

  actions: {
    hideFirstView () {
      this.isShowenFirstView = true
    }
  }
})

export {
  useStore
}
