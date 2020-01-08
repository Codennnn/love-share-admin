import request from '../request'

export function signIn(data) {
  return request({
    url: '/admin/sign_in',
    method: 'post',
    data,
  })
}

export function getAdminList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params,
  })
}

export function getAdminInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function getAdminDetail(params) {
  return request({
    url: '/admin/detail',
    method: 'get',
    params,
  })
}
