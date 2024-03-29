import axios from 'axios'
import { errorNotify, consoleLog } from '@/utils/util'
import { getToken } from '@/utils/token'

const service = axios.create({
  // baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
  timeout: 20000,
  responseType: 'json',
  withCredentials: true,
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

service.interceptors.request.use(
  (config) => {
    // 每次请求都带上token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

const errorHandler = {
  401(status, statusText) {
    errorNotify({ title: `${status}`, message: `抱歉，您没有权限访问 - 请确认已登录后再重新操作，${statusText}` })
  },
  404(status, statusText) {
    errorNotify({ title: `${status}`, message: `找不到资源 - ${statusText}` })
  },
  418(status) {
    errorNotify({ title: `${status}`, message: '登录过期，请重新登录~' })
  },
  422(status, statusText) {
    errorNotify({ title: `${status}`, message: `参数校验出错 - ${statusText}` })
  },
  500(status, statusText) {
    errorNotify({ title: `${status}`, message: `服务出错 - ${statusText}` })
  },
  default() {
    errorNotify()
  },
}

service.interceptors.response.use(
  (response) => {
    try {
      const { data } = response
      const { code, msg } = data
      if (code !== 2000) {
        errorNotify({
          title: `错误代码 - ${code}`,
          message: msg,
          duration: 5000,
        })
      }
      return data
    } catch (message) {
      errorNotify({ message })
      return { code: 5000 }
    }
  },
  (error) => {
    consoleLog(error.response, 'Vue')

    const { status, statusText } = error.response
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    Object.prototype.hasOwnProperty.call(errorHandler, status)
      ? errorHandler[status](status, statusText)
      : errorHandler.default()
    return { code: 5000 }
  },
)

export default service
