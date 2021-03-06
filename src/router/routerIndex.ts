import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { appendTransition } from './routerTransition'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@views/InitApp.vue')
  },
  {
    path: '/splash-screen',
    component: () => import('@views/SplashScreen.vue')
  },
  {
    path: '/login',
    component: () => import('@views/Login&SignIn/LoginView.vue')
  },
  {
    path: '/sign-in',
    component: () => import('@views/Login&SignIn/SignInView.vue')
  },
  {
    path: '/main',
    component: () => import('@views/main/MainView.vue'),
    children: [
      {
        path: '',
        redirect: '/main/home'
      },
      {
        path: 'home',
        component: () => import('@views/main/home/MainHome.vue')
      },
      {
        path: 'search',
        component: () => import('@views/main/search/MainSearch.vue'),
        children: [
          {
            path: '',
            redirect: '/main/search/histories'
          },
          {
            path: 'histories',
            component: () => import('@views/main/search/SearchHistories.vue')
          },
          {
            path: 'suggestions',
            component: () => import('@views/main/search/SearchSuggestions.vue')
          },
          {
            path: 'result',
            component: () => import('@views/main/search/SearchResult.vue')
          }
        ]
      },
      {
        path: 'account',
        component: () => import('@views/main/account/MainAccount.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router switch transition
router.afterEach(appendTransition)

export default router
