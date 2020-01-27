import request from '../request'

export function addContact(data) {
  return request({
    url: '/admin/chat/contact/add',
    method: 'post',
    data,
  })
}

export function deleteContact(data) {
  return request({
    url: '/admin/chat/contact/delete',
    method: 'delete',
    data,
  })
}

export function getContactList() {
  return request({
    url: '/admin/chat/contact/list',
    method: 'get',
  })
}

export function getChatData() {
  return request({
    url: '/admin/chat/chat_data',
    method: 'get',
  })
}

export function getContactInfo(params) {
  return request({
    url: '/admin/chat/contact_info',
    method: 'get',
    params,
  })
}
