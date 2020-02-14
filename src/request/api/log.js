import request from '../request'

export function getLogList(params) {
  return request({
    url: '/log/list',
    method: 'get',
    params,
  })
}

export function createGuide(data) {
  return request({
    url: '/guide/create',
    method: 'post',
    data,
  })
}
