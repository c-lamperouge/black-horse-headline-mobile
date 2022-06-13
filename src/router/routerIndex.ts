import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/test'
  // },
  {
    path: '/test',
    alias: '/',
    name: 'test',
    component: () => import('@views/TheTest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
