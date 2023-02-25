import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录',
      },
      component: Login,
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
            icon: 'Menu',
            name: '系统首页',
          },
          component: () => import('../views/Dashboard.vue'),
        },
        {
          path: '/search',
          name: 'search',
          meta: {
            parent: '/table',
            name: '搜索表格',
          },
          children: [
            {
              path: '/articles',
              name: 'articles',
              meta: {
                name: '搜索列表（文章）',
              },
              component: () => import('../views/Articles.vue'),
            },
            {
              path: '/projects',
              name: 'projects',
              meta: {
                name: '搜索列表（项目）',
              },
              component: () => import('../views/Articles.vue'),
            },
            {
              path: '/applications',
              name: 'applications',
              meta: {
                name: '搜索列表（文章）',
              },
              component: () => import('../views/Articles.vue'),
            },
          ],
        },
        {
          path: '/table',
          name: 'table',
          meta: {
            title: '表格',
            name: '简单表格',
            icon: 'List',
          },
          component: () => import('../views/Table.vue'),
        },
        {
          path: '/complexTable',
          name: 'complexTable',
          meta: {
            name: '复杂表格',
            parent: '/table',
          },
          component: () => import('../views/ComplexTable.vue'),
        },
        {
          path: '/basicForm',
          name: 'basicForm',
          meta: {
            title: '表单',
            name: '基础表单',
            icon: 'Document',
          },
          component: () => import('../views/BasicForm.vue'),
        },
        {
          path: '/stepForm',
          name: 'stepForm',
          meta: {
            name: '基础表单',
            parent: '/basicForm',
          },
          component: () => import('../views/StepForm.vue'),
        },
        {
          path: '/user',
          name: 'user',
          meta: {
            icon: 'UserFilled',
            title: '个人中心',
          },
          component: () => import('../views/AccountCenter.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: {
        title: '未知页面',
      },
      component: () => import('../views/NotFound.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const islogin = sessionStorage.getItem('token');
  if (!islogin && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
});
export default router;
