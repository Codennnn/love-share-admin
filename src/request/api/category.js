import request from '../request'

export function getCategoryList() {
  return request({
    url: '/category/list',
    method: 'get',
  })
}

export function addCategory(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data,
  })
}

export function deleteCategory(data) {
  return request({
    url: '/category/delete',
    method: 'delete',
    data,
  })
}

export function updateCategoryActivation(data) {
  return request({
    url: '/category/update_activation',
    method: 'put',
    data,
  })
}
