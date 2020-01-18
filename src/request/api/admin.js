import request from '../request'

export function signIn(data) {
  return request({
    url: '/admin/sign_in',
    method: 'post',
    data,
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/create',
    method: 'post',
    data,
  })
}

export function updateAdmin(data) {
  return request({
    url: '/admin/update',
    method: 'put',
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

export function uploadAvatar(data) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/admin/upload_avatar',
    method: 'post',
    data,
  })
}

export function replaceAvatar(data) {
  return request({
    url: '/admin/replace_avatar',
    method: 'put',
    data,
  })
}
