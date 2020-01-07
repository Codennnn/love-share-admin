import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import admin from './modules/admin'
import todo from './modules/todo'
import cart from './modules/cart'
import chat from './modules/chat'
import notice from './modules/notice'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    todo,
    cart,
    chat,
    notice,
    permission,
  },

  state,
  getters,
  mutations,
  actions,
})
