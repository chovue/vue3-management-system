import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: "Login",
      meta: {
        title: '登录',
      },
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
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
  const islogin = sessionStorage.getItem('token')
  if (!islogin && to.path !== '/login') {
    next('/login');
  } else {
    next()
  }
}
)
export default router
