import { setToken, getToken, removeToken } from '@/permission/token'
import { signIn, getAdminInfo } from '@/request/api/admin'
import { resetRouter } from '@/router/router'

const state = {
  token: getToken(),
  info: {},
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_INFO(state, info) {
    state.info = info
  },
  SET_AVATAR(state, url) {
    state.info.avatar_url = url
  },
}

const actions = {
  async signIn({ commit }, payload) {
    try {
      const { code, data } = await signIn(payload)
      if (code === 2000) {
        commit('SET_TOKEN', data.token)
        setToken(data.token) // 将 token 缓存到 cookie
      }
      return code
    } catch (err) {
      return err
    }
  },

  async getAdminInfo({ commit }) {
    try {
      const { code, data: { admin_info } } = await getAdminInfo()
      if (code === 2000) {
        commit('SET_INFO', admin_info)
      }
      return admin_info
    } catch (err) {
      removeToken()
      return Promise.reject(err)
    }
  },

  async SignOut({ commit }) {
    commit('SET_TOKEN', '')
    removeToken() // 移除本地token缓存
    resetRouter() // 重置路由，不然会出现路由重复的情况
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    adminId: state => state.info._id,
    roles: state => state.info.roles,
    nickname: state => state.info.nickname,
    avatar: state => state.info.avatar_url,
  },
}
