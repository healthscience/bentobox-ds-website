import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Terms from '../views/Terms.vue'
import Checksum from '../views/Checksum.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/checksum',
    name: 'Checksum',
    component: Checksum
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
