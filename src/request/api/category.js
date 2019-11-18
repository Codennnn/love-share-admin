import request from '../request'

export function getCategoryList() {
  return request({
    url: '/category/list',
    method: 'get',
  })
}

export function addCategory() {
  return request({
    url: '/category/add',
    method: 'post',
  })
}

export function deleteCategory() {
  return request({
    url: '/category/delete',
    method: 'delete',
  })
}
