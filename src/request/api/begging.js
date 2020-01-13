import request from '../request'

export function getBeggingList(params) {
  return request({
    url: '/begging/list',
    method: 'get',
    params,
  })
}

export function addBuying() {
  return request({
    url: '/buying/add',
    method: 'post',
  })
}

export function deleteBuying() {
  return request({
    url: '/buying/delete',
    method: 'delete',
  })
}

export function updateBuying() {
  return request({
    url: '/buying/update',
    method: 'put',
  })
}
