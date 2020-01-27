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

export function updateBegging() {
  return request({
    url: '/buying/add',
    method: 'post',
  })
}

export function deleteBegging() {
  return request({
    url: '/buying/add',
    method: 'post',
  })
}
