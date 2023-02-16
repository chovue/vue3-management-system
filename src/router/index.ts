import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
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
          path: '/about',
          name: 'about',
          meta: {
            title: '其它页面'
          },
          component: () => import('../views/AboutView.vue')
        }
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  const islogin = localStorage.getItem('user')
  if (!islogin && to.path !== '/login') {
    next('/login');
  } else {
    next()
  }

}
)
export default router
