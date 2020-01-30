import request from '../request'

export function resetPassword() {
  return request({
    url: '/user/reset_password',
    method: 'put',
  })
}

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  })
}

export function getUserDetailByAdmin(params) {
  return request({
    url: '/user/detail_by_admin',
    method: 'get',
    params,
  })
}

export function getUserDetailInfo() {
  return request({
    url: '/user/detail_info',
    method: 'get',
  })
}

export function getRecentContacts() {
  return request({
    url: '/user/recent_contacts',
    method: 'get',
  })
}

export function getAddressList() {
  return request({
    url: '/user/address_list',
    method: 'get',
  })
}

export function setDefaultAddress() {
  return request({
    url: '/user/default_address',
    method: 'post',
  })
}

export function addAddress() {
  return request({
    url: '/user/address/add',
    method: 'post',
  })
}

export function deleteAddress() {
  return request({
    url: '/user/address/delete',
    method: 'delete',
  })
}

export function modifyAddress() {
  return request({
    url: '/user/address/update',
    method: 'put',
  })
}

export function getUserDailyStatistics(data) {
  return request({
    url: '/user/daily_statistics',
    method: 'post',
    data,
  })
}
