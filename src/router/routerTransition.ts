import type { NavigationHookAfter } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    transition1: string
    transition2: string
    transition3: string | undefined
  }
}

const appendTransition: NavigationHookAfter = (to, from) => {
  // level 1 transition
  if (from.path.startsWith('/splash-screen') && to.path.startsWith('/login')) {
    to.meta.transition1 = 'router-slide-left'
  } else if (from.path.startsWith('/login') && to.path.startsWith('/main')) {
    to.meta.transition1 = 'router-slide-left'
  } else if (from.path.startsWith('/main') && to.path.startsWith('/login')) {
    to.meta.transition1 = 'router-slide-right'
  }
}

export {
  appendTransition
}
