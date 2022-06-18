import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    transition: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@views/WhiteScreen.vue')
  },
  {
    path: '/first-view',
    name: 'first-view',
    component: () => import('@views/FirstView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/Login&SignIn/LoginView.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@views/Login&SignIn/SignInView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@views/main/MainView.vue'),
    children: [
      {
        path: '',
        redirect: '/main/account'
      },
      {
        path: 'home',
        name: 'main-home',
        component: () => import('@views/main/MainHome.vue')
      },
      {
        path: 'questions',
        name: 'main-questions',
        component: () => import('@views/main/MainQuestions.vue')
      },
      {
        path: 'videos',
        name: 'main-videos',
        component: () => import('@views/main/MainVideos.vue')
      },
      {
        path: 'account',
        name: 'main-account',
        component: () => import('@views/main/MainAccount.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@views/TheTest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
