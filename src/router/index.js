import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//全局进度条的配置
NProgress.configure({
  showSpinner: false,
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index1.vue'),
        },
        {
          path: '/index',
          name: 'index',
          component: () => import('@/views/Home/index1.vue'),
        },
        {
          path: 'allCategories',
          name: 'allCategories',
          component: () => import('@/views/AllCategories/index.vue'),
        },
        // {
        //   path: 'category/:id',
        //   name: 'category',
        //   component: () => import('@/views/Category/index.vue'),
        // },
        {
          path: 'category/:type/:id',
          name: 'category',
          component: () => import('@/views/Category/index1.vue'),
        },
        {
          path: 'category/sub/:id',
          name: 'SubCategory',
          component: () => import('@/views/SubCategory/index.vue'),
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: () => import('@/views/Detail/index.vue'),
        },
        {
          path: 'cartlist',
          name: 'cartlist',
          component: () => import('@/views/CartList/index.vue'),
        },
        {
          path: 'settlement',
          name: 'settlement',
          component: () => import('@/views/Settlement/index.vue'),
        },
        {
          path: 'settlement1',
          name: 'settlement1', ////测试
          component: () => import('@/views/Settlement/index1.vue'),
        },
        {
          path: 'pay',
          name: 'pay',
          component: () => import('@/views/Pay/index.vue'),
        },
        {
          path: 'pay/result',
          name: 'payResult',
          component: () => import('@/views/Pay/PayResult.vue'),
        },
        {
          path: 'member',
          name: 'member',
          component: () => import('@/views/Member/index.vue'),
          children: [
            // {
            //   path: 'home',
            //   component: () => import('@/views/Member/UserHome/index.vue'),
            // },
            {
              path: 'info',
              name: 'member-userinfo',
              component: () => import('@/views/Member/UserInfo/index.vue'),
            },
            {
              path: 'address',
              name: 'member-useraddress',
              component: () => import('@/views/Member/UserAddress/index.vue'),
            },
            {
              path: 'order',
              name: 'member-userorder',
              component: () => import('@/views/Member/UserOrder/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      redirect: { name: 'home' },
      // component: () => import("@/views/NotFound/index.vue"),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

// 页面渲染成功之后，展示进度条（实际效果：Mac的Chrome就是在页面顶部有条2px左右的进度条）
router.beforeEach(async () => {
  NProgress.start()
})

// 页面加载成功之后，关闭进度条
router.afterEach(() => {
  NProgress.done()
})
export default router
