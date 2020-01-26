import request from '../request'

export function getNoticeList(params) {
  return request({
    url: '/admin/notice/list',
    method: 'get',
    params,
  })
}

export function getUnreadNotices() {
  return request({
    url: '/admin/notice/unread',
    method: 'get',
  })
}

export function setNoticeRead(data) {
  return request({
    url: '/admin/notice/set_read',
    method: 'put',
    data,
  })
}

export function setAllNoticesRead(data) {
  return request({
    url: '/admin/notice/set_all_read',
    method: 'put',
    data,
  })
}

export function deleteNotice(data) {
  return request({
    url: '/admin/notice/delete',
    method: 'delete',
    data,
  })
}

export function deleteManyNotices(data) {
  return request({
    url: '/admin/notice/delete_many',
    method: 'delete',
    data,
  })
}
