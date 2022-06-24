import type { NavigationHookAfter } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    transition1: string
    transition2: string
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

  // level 2 main transition
  if (from.path.startsWith('/main/home') && to.path.startsWith('/main/search')) {
    to.meta.transition2 = 'router-slide-left'
  } else if (from.path.startsWith('/main/home') && to.path.startsWith('/main/account')) {
    to.meta.transition2 = 'router-slide-left'
  } else if (from.path.startsWith('/main/search') && to.path.startsWith('/main/account')) {
    to.meta.transition2 = 'router-slide-left'
  } else if (from.path.startsWith('/main/account') && to.path.startsWith('/main/search')) {
    to.meta.transition2 = 'router-slide-right'
  } else if (from.path.startsWith('/main/account') && to.path.startsWith('/main/home')) {
    to.meta.transition2 = 'router-slide-right'
  } else if (from.path.startsWith('/main/search') && to.path.startsWith('/main/home')) {
    to.meta.transition2 = 'router-slide-right'
  }
}

export {
  appendTransition
}
