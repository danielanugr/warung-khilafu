import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Home' && !localStorage.access_token) next({ name: 'Home' })
  else next()
})

export default router
