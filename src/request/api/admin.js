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

export function createAdminByInvitation(data) {
  return request({
    url: '/admin/invitation',
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

export function getSignLog() {
  return request({
    url: '/admin/sign_log',
    method: 'get',
  })
}

export function bindUser(data) {
  return request({
    url: '/admin/bind_user',
    method: 'put',
    data,
  })
}

export function unbindUser() {
  return request({
    url: '/admin/unbind_user',
    method: 'put',
  })
}

export function getUserInfo(params) {
  return request({
    url: '/user/other/info',
    method: 'get',
    params,
  })
}

export function updatePassword(data) {
  return request({
    url: '/admin/update_password',
    method: 'put',
    data,
  })
}

export function updateLockPassword(data) {
  return request({
    url: '/admin/update_lock_password',
    method: 'put',
    data,
  })
}
