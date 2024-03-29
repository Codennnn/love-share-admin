import Vue from 'vue'
import animated from 'animate.css'
import VueClipboard from 'vue-clipboard2'
import dayjs from 'dayjs'
// import VueSocketIO from 'vue-socket.io'
import infiniteScroll from 'vue-infinite-scroll'
import VueFeather from 'vue-feather'
import './request/mock/mock'
import {
  numFixed, timeDiff, cloneDeepWith, loading,
} from '@/utils/util'
import errorHandler from '@/utils/error-handler'

import App from './App.vue'
import router from './router/router'
import store from './store/store'

import 'dayjs/locale/zh-cn' // dayjs 语言包
import './router/control' // 路由控制
import '@/layouts/theme' // 网站主题，样式
import '@/directives' // 自定义指令

// Vue.use(new VueSocketIO({
//   connection: process.env.NODE_ENV === 'production' ? 'https://holdme.top/api' : 'http://127.0.0.1:7001',
// }))

Vue.use(animated)
Vue.use(VueClipboard)
Vue.use(infiniteScroll)
Vue.use(VueFeather)

Vue.prototype.$dayjs = dayjs
Vue.prototype.$numFixed = numFixed
Vue.prototype.$timeDiff = timeDiff
Vue.prototype.$cloneDeepWith = cloneDeepWith
Vue.prototype.$loading = loading

Vue.config.errorHandler = errorHandler
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
