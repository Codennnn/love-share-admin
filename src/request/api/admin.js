import request from '../request'

export function signIn(data) {
  return request({
    url: '/admin/sign_in',
    method: 'post',
    data,
  })
}

export function getAdminInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}
