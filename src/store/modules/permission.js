import { constantRoutes, asyncRoutes } from '@/router/router'

// 检测是否能对应上相应路由的角色权限
function hasPermission(permissions, { meta }) {
  if (meta?.permission) {
    return permissions.some((el) => {
      if (el.module === meta.permission.moduleName) {
        return meta.permission.purviews.every(it => el.purview.indexOf(it) > -1)
      }
      return false
    })
  }
  // 默认是具有权限的，所以返回 true
  return true
}

// 过滤没有角色权限的路由
export function filterAsyncRoutes(routes, permissions) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
}

const actions = {
  generateRoutes({ commit }, permissions) {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
