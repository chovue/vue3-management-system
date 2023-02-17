import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      name: '',
      component: Home,
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '系统首页'
          },
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: '/table',
          name: 'table',
          meta: {
            title: '简单表格'
          },
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/complexTable',
          name: 'complexTable',
          meta: {
            title: '复杂表格'
          },
          component: () => import('../views/AboutView.vue')
        }
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  const islogin = localStorage.getItem('user')
  if (!islogin && to.path !== '/') {
    next('/');
  } else {
    next()
  }
}
)
export default router
