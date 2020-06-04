import Mock from 'mockjs'

import admin from './admin'
import user from './user'
import goods from './goods'
import other from './other'

Mock.mock('/admin/sign_in', 'post', {
  code: 2000,
  data: admin.sign_in,
})
Mock.mock('/admin/info', 'get', {
  code: 2000,
  data: admin.info,
})
Mock.mock('/admin/list', 'get', {
  code: 2000,
  data: admin.admin_list,
})
Mock.mock('/admin/sign_log', 'get', {
  code: 2000,
})
Mock.mock('/admin/todo/list', 'get', {
  code: 2000,
  data: admin.todo_list,
})
Mock.mock('/admin/notice/unread', 'get', {
  code: 2000,
  data: admin.notice_unread,
})
Mock.mock('/admin/detail', 'get', {
  code: 2000,
})


Mock.mock('/user/other/info', 'get', {
  code: 2000,
  data: user.other_info,
})
Mock.mock('/user/daily_statistics', 'post', {
  code: 2000,
  data: user.daily_statistics,
})


Mock.mock('/school/list', 'get', {
  code: 2000,
  data: other.school_list,
})
Mock.mock('/category/list', 'get', {
  code: 2000,
  data: other.category_list,
})
Mock.mock('/log/add', 'post', {
  code: 2000,
})


Mock.mock('/goods/list/info', 'get', {
  code: 2000,
  data: goods.list_info,
})
Mock.mock('/goods/list/on_sell?page=1&page_size=100', 'get', {
  code: 2000,
  data: goods.goods_list,
})

Mock.setup({
  timeout: '300-500',
})

export default Mock
