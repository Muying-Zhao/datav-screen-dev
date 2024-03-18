import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BaseTest from '../views/BaseTest.vue'
import Templine from '../views/Templine.vue'
import Test from '../views/Test.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/basetest',
    name: 'BaseTest',
    component: BaseTest
  },
  {
    path: '/templine',
    name: 'Templine',
    component: Templine
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
