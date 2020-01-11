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

export function addArticle(data) {
  return request({
    url: '/guide/article/add',
    method: 'post',
    data,
  })
}

export function getArticle(params) {
  return request({
    url: '/guide/article',
    method: 'get',
    params,
  })
}
