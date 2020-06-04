import Mock from 'mockjs'

import admin from './admin'
import user from './user'
import goods from './goods'
import chat from './chat'
import order from './order'
import other from './other'

Mock.mock('/admin/sign_in', 'post', admin.sign_in)
Mock.mock('/admin/info', 'get', admin.info)
Mock.mock('/admin/list', 'get', admin.admin_list)
Mock.mock('/admin/sign_log', 'get', admin.sign_log)
Mock.mock('/admin/todo/list', 'get', admin.todo_list)
Mock.mock('/admin/notice/unread', 'get', admin.notice_unread)
Mock.mock(/\/admin\/detail/, 'get', admin.admin_detail)
Mock.mock(/\/admin\/todo\/update_type/, 'put', { code: 2000 })
Mock.mock(/\/admin\/todo\/update/, 'put', { code: 2000 })


Mock.mock('/user/list', 'get', user.user_list)
Mock.mock('/user/block_list', 'get', user.block_list)
Mock.mock(/\/user\/other\/info/, 'get', user.other_info)
Mock.mock('/user/daily_statistics', 'post', user.daily_statistics)


Mock.mock('/school/list', 'get', other.school_list)
Mock.mock('/category/list', 'get', other.category_list)
Mock.mock('/guide/list', 'get', other.guide_list)
Mock.mock('/log/list', 'get', other.log_list)
Mock.mock(/\/guide\/article\/content/, 'get', other.guide_article)
Mock.mock('/billboard/list', 'get', other.billboard_list)
Mock.mock(/\/notice\/list/, 'get', other.notice_list)
Mock.mock('/log/add', 'post', { code: 2000 })
Mock.mock('/log/delete', 'delete', { code: 2000 })


Mock.mock(/\/chat\/contact\/list/, 'get', chat.contact_list)
Mock.mock(/\/chat\/chat_data/, 'get', chat.chat_data)


Mock.mock('/goods/list/info', 'get', goods.list_info)
Mock.mock(/\/goods\/list\/on_sell/, 'get', goods.goods_list)
Mock.mock(/\/goods\/list\/off_sell/, 'get', goods.goods_list)
Mock.mock(/\/goods\/detail/, 'get', goods.goods_detail)
Mock.mock(/\/goods\/seller/, 'get', goods.goods_seller)
Mock.mock(/\/goods\/comments/, 'get', goods.goods_comments)
Mock.mock(/\/goods\/list\/by_school_or_category_admin/, 'get', goods.goods_list)
Mock.mock(/\/goods\/list\/by_search/, 'get', goods.goods_list)
Mock.mock(/\/goods\/list\/by_date_range/, 'post', goods.goods_list)
Mock.mock(/\/begging\/list/, 'get', goods.begging_list)


Mock.mock('/order/transaction', 'get', order.transaction)
Mock.mock('/order/volume', 'get', order.volume)
Mock.mock('/order/num', 'get', order.num)
Mock.mock(/\/order\/list/, 'get', order.order_list)

Mock.setup({
  timeout: '300-500',
})

export default Mock
