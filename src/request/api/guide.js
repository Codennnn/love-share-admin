import request from '../request'

export function getGuideList() {
  return request({
    url: '/guide/list',
    method: 'get',
  })
}

export function createGuide(data) {
  return request({
    url: '/guide/create',
    method: 'post',
    data,
  })
}

export function deleteGuide(data) {
  return request({
    url: '/guide/delete',
    method: 'delete',
    data,
  })
}

export function getArticle(params) {
  return request({
    url: '/guide/article/content',
    method: 'get',
    params,
  })
}

export function addArticle(data) {
  return request({
    url: '/guide/article/add',
    method: 'post',
    data,
  })
}

export function updateArticle(data) {
  return request({
    url: '/guide/article/update',
    method: 'put',
    data,
  })
}

export function deleteArticle(data) {
  return request({
    url: '/guide/article/delete',
    method: 'delete',
    data,
  })
}
