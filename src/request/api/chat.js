import request from '../request'

export function addContact(data) {
  return request({
    url: '/chat/contact/add',
    method: 'post',
    data,
  })
}

export function getContactList(params) {
  return request({
    url: '/chat/contact/list',
    method: 'get',
    params,
  })
}

export function getChatData(params) {
  return request({
    url: '/chat/chat_data',
    method: 'get',
    params,
  })
}

export function getContactInfo(params) {
  return request({
    url: '/chat/contact_info',
    method: 'get',
    params,
  })
}
