import Vue from 'vue'
import store from '@/store/store'

// 判断管理员是否已绑定用户
Vue.directive('bind', {
  inserted(el) {
    if (!store.getters['admin/userId']) {
      el.parentNode.removeChild(el) // 如果没有权限，则移除节点
    }
  },
})
Vue.prototype.$bind = () => {
  if (store.getters['admin/userId']) {
    return true
  }
  return false
}
