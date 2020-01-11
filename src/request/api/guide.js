import request from '../request'

export function createGuide(data) {
  return request({
    url: '/guide/create',
    method: 'post',
    data,
  })
}

export function getGuideList() {
  return request({
    url: '/guide/list',
    method: 'get',
  })
}
