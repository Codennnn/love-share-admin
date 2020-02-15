import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layouts/Main.vue' // 主框架
import Analytics from '@/views/analytics/Analytics.vue' // 数据分析

const TodoList = () => import('@/views/todo-list/TodoList.vue')

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/sign',
    name: 'Sing',
    hidden: true,
    component: () => import('@/views/sign/Sign.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/not-found',
    name: 'not-found',
    hidden: true,
    component: () => import('@/views/error-page/NotFound.vue'),
    meta: { title: '404 not found' },
  },
  {
    path: '/lock-screen',
    name: 'LockScreen',
    hidden: true,
    component: () => import('@/views/lock-screen/LockScreen.vue'),
    meta: { title: '屏幕锁定' },
  },
]

export const asyncRoutes = [
  /*
   * 数据分析
   */
  {
    path: '/',
    redirect: '/analytics',
    component: Layout,
    children: [
      {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics,
        meta: { title: '数据分析' },
      },
      {
        path: '/monitor',
        name: 'Monitor',
        component: () => import('@/views/analytics/Monitor.vue'),
        meta: { title: '数据监控' },
      },
      {
        path: '/text',
        name: 'Text',
        component: () => import('@/views/analytics/Text.vue'),
        meta: { title: '测试' },
      },
    ],
    meta: { title: '数据分析', icon: 'activity' },
  },

  /*
   * 商品管理
   */
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/goods-list',
        name: 'GoodsList',
        component: () => import('@/views/goods/GoodsList.vue'),
        meta: { title: '商品列表', permission: { moduleName: 'goods', purviews: ['read'] } },
      },
    ],
    meta: { title: '商品管理', icon: 'package' },
  },

  /*
   * 订单管理
   */
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/order-list',
        name: 'OrderList',
        component: () => import('@/views/order/OrderList.vue'),
        meta: { title: '订单列表' },
      },
    ],
    meta: { title: '订单管理', icon: 'clipboard' },
  },

  /*
   * 用户管理
   */
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/user-list',
        name: 'UserList',
        component: () => import('@/views/user/UserList.vue'),
        meta: { title: '用户列表', permission: { moduleName: 'user', purviews: ['read'] } },
      },
      {
        path: '/user-black-list',
        name: 'UserBlackList',
        component: () => import('@/views/user/UserBlackList.vue'),
        meta: { title: '用户黑名单' },
      },
    ],
    meta: { title: '用户管理', icon: 'users' },
  },

  /*
   * 求购管理
   */
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/begging-list',
        name: 'BeggingList',
        component: () => import('@/views/begging/BeggingList.vue'),
        meta: { title: '求购列表' },
      },
    ],
    meta: { title: '求购管理', icon: 'shopping-bag' },
  },

  /*
   * 资讯管理
   */
  {
    path: '/service',
    component: Layout,
    children: [
      {
        path: '/help-center',
        name: 'HelpCenter',
        component: () => import('@/views/service/HelpCenter.vue'),
        meta: { title: '帮助中心' },
      },
      {
        path: '/',
        name: '',
        component: () => import('@/views/user/UserList.vue'),
        meta: { title: '常见问题' },
      },
    ],
    meta: { title: '资讯管理', icon: 'map' },
  },

  /*
   * 网站管理
   */
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/website',
        name: 'Website',
        component: () => import('@/views/website/Billboard.vue'),
        meta: { title: '广告牌' },
      },
      {
        path: '/school-management',
        name: 'SchoolManagement',
        component: () => import('@/views/website/SchoolManagement.vue'),
        meta: { title: '学校列表' },
      },
      {
        path: '/goods-category',
        name: 'GoodsCategory',
        component: () => import('@/views/goods/GoodsCategory.vue'),
        meta: { title: '商品分类' },
      },
    ],
    meta: { title: '网站管理', icon: 'monitor' },
  },

  /*
   * 系统管理
   */
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/admin-list',
        name: 'AdminList',
        component: () => import('@/views/admin/AdminList.vue'),
        meta: { title: '管理员列表' },
      },
      {
        path: '/admin-create',
        name: 'AdminCreate',
        component: () => import('@/views/admin/AdminCreate.vue'),
        meta: { title: '创建管理员' },
      },
    ],
    meta: { title: '系统管理', icon: 'sliders' },
  },

  /*
   * 任务列表
   */
  {
    path: '',
    single: true,
    component: Layout,
    children: [
      {
        path: '/todo-list',
        name: 'TodoList',
        component: TodoList,
        meta: { title: '任务列表', icon: 'server' },
      },
    ],
  },

  /*
   * 不显示在侧边栏的路由
   */
  {
    path: '',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/goods-detail',
        name: 'GoodsDetail',
        component: () => import('@/views/goods/GoodsDetail.vue'),
        meta: {
          title: '商品详情',
          breadcrumb: [
            { title: '首页', to: '/' },
            { title: '商品列表', to: '/goods-list' },
            { title: '商品详情', active: true },
          ],
        },
      },
      {
        path: '/log',
        name: 'Log',
        component: () => import('@/views/log/Log.vue'),
        meta: { title: '网站日志' },
      },
      {
        path: '/order-detail',
        name: 'OrderDetail',
        component: () => import('@/views/order/OrderDetail.vue'),
        meta: {
          title: '订单详情',
          breadcrumb: [
            { title: '首页', to: '/' },
            { title: '查询订单', to: '/order-list' },
            { title: '订单详情', active: true },
          ],
        },
      },
      {
        path: '/user-detail',
        name: 'UserDetail',
        component: () => import('@/views/user/UserDetail.vue'),
        meta: {
          title: '用户详情',
          breadcrumb: [
            { title: '首页', to: '/' },
            { title: '用户列表', to: '/user-list' },
            { title: '用户详情', active: true },
          ],
        },
      },
      {
        path: '/admin-detail',
        name: 'AdminDetail',
        component: () => import('@/views/admin/AdminDetail.vue'),
        meta: {
          title: '管理员信息',
          breadcrumb: [
            { title: '首页', to: '/' },
            { title: '管理员列表', to: '/admin-list' },
            { title: '管理员信息', active: true },
          ],
        },
      },
      {
        path: '/admin-edit',
        name: 'AdminEdit',
        component: () => import('@/views/admin/AdminEdit.vue'),
        meta: {
          title: '管理员信息',
          breadcrumb: [
            { title: '首页', to: '/' },
            { title: '管理员列表', to: '/admin-list' },
            { title: '编辑管理员', active: true },
          ],
        },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/Profile.vue'),
        meta: {
          title: '个人中心',
        },
      },
      {
        path: '/profile-setting',
        name: 'ProfileSetting',
        component: () => import('@/views/profile/ProfileSetting.vue'),
        meta: {
          title: '账号设置',
          breadcrumb: [
            { title: '首页', to: '/' },
            { title: '个人中心', to: '/profile' },
            { title: '账号设置', active: true },
          ],
        },
      },
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('@/views/notice/Notice.vue'),
        meta: {
          title: '通知中心',
        },
      },
    ],
  },

  { path: '*', redirect: '/not-found', hidden: true },
]

const createRouter = () => new Router({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRoutes,
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
