import request from '../request'

export function getTodoList() {
  return request({
    url: '/admin/todo/list',
    method: 'get',
  })
}

export function addTodo(data) {
  return request({
    url: '/admin/todo/add',
    method: 'post',
    data,
  })
}

export function deleteTodo(data) {
  return request({
    url: '/admin/todo/delete',
    method: 'delete',
    data,
  })
}

export function updateTodo(data) {
  return request({
    url: '/admin/todo/update',
    method: 'put',
    data,
  })
}
