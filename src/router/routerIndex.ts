import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
    path: '/log-in',
    name: 'log-in',
    component: () => import('@views/LogInPage.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@views/SignInPage.vue')
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
