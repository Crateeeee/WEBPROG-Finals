import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Guestbook from '../views/Guestbook.vue'
import Music from '../views/Music.vue'
import Documentation from '../views/Documentation.vue'

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
  },
  {
    path: '/music',
    name: 'Music',
    component: Music
  },
  {
    path: '/docs',
    name: 'Documentation',
    component: Documentation
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
