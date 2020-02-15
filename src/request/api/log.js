import request from '../request'

export function getLogList(params) {
  return request({
    url: '/log/list',
    method: 'get',
    params,
  })
}

export function deleteLog(data) {
  return request({
    url: '/log/delete',
    method: 'delete',
    data,
  })
}
