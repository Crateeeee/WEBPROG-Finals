import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Guestbook from '../views/Guestbook.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/guestbook',
    name: 'Guestbook',
    component: Guestbook
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router
