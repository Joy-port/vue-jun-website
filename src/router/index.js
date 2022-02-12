import { createRouter, createWebHashHistory } from 'vue-router'
import FrontBoard from '../views/frontend/Frontboard.vue'

const routes = [
  {
    path: '/',
    name: 'frontBoard',
    component: FrontBoard,
    children: [
      {
        path: '',
        name: '',
        component: () => import('../views/frontend/Home.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/frontend/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backend/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('../views/backend/Admin.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
