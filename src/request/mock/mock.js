import Mock from 'mockjs'

Mock.mock('/admin/sign_in', 'post', {
  code: 2000,
  data: {
    token: 'token',
  },
})
Mock.mock('/admin/info', 'get', {
  code: 2000,
  data: {
    admin_info: 'token',
  },
})
Mock.mock('/admin/list', 'get', {
  code: 2000,
})
Mock.mock('/admin/sign_log', 'get', {
  code: 2000,
})
Mock.mock('/admin/detail', 'get', {
  code: 2000,
})
Mock.mock('/user/other/info', 'get', {
  code: 2000,
})

Mock.setup({
  timeout: '300-500',
})

export default Mock
