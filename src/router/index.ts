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
          component: () => import('../views/Table.vue')
        },
        {
          path: '/complexTable',
          name: 'complexTable',
          meta: {
            title: '复杂表格'
          },
          component: () => import('../views/ComplexTable.vue')
        },
        {
          path: '/basicForm',
          name: 'basicForm',
          meta: {
            title: '基础表单'
          },
          component: () => import('../views/BasicForm.vue')
        },
        {
          path: '/stepForm',
          name: 'stepForm',
          meta: {
            title: '基础表单'
          },
          component: () => import('../views/StepForm.vue')
        },
        {
          path: '/user',
          name: 'user',
          meta: {
            title: '个人中心'
          },
          component: () => import('../views/User.vue')
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
