import NProgress from 'nprogress'
import router from './router'
import store from '@/store/store'

import 'nprogress/nprogress.css'
import { getToken, removeToken } from '@/utils/token'

NProgress.configure({ showSpinner: false })

const whiteList = ['/sign']

const setPageTitle = (title) => {
  const subTitle = title ? `${title} - ` : ''
  document.title = `${subTitle}${process.env.VUE_APP_PAGE_TITLE}`
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  setPageTitle(to.meta?.title)

  const hasToken = !!getToken()

  if (hasToken) {
    const isLocked = JSON.parse(localStorage.getItem('screen_lock'))?.isLocked
    if (isLocked && to.path !== '/lock-screen') {
      next({ path: '/lock-screen' })
      NProgress.done()
    } else if (to.path === '/sign') {
      // 如果已经有了 token 再访问登录页的话，将会被重定向到首页
      next({ path: '/' })
    } else {
      const hasPermissions = !!(store.getters['admin/permissions']?.length > 0)
      if (hasPermissions) {
        next()
      } else {
        try {
          const { permissions } = await store.dispatch('admin/getAdminInfo')
          const accessedRoutes = await store.dispatch('permission/generateRoutes', permissions)
          // 动态添加路由
          router.addRoutes(accessedRoutes)
          next({ ...to, replace: true })
        } catch {
          removeToken()
          next('/sign')
        }
      }
    }
  } else if (whiteList.includes(to.path)) {
    // 如果路由在白名单里面，直接next
    next()
  } else {
    // 最后，如果没有权限，则重定向回登录页
    next('/sign')
  }
})

router.afterEach(() => {
  NProgress.done()
})
