import request from '../request'

export function getSchoolList() {
  return request({
    url: '/school/list',
    method: 'get',
  })
}

export function addSchool(data) {
  return request({
    url: '/school/add',
    method: 'post',
    data,
  })
}

export function deleteSchool() {
  return request({
    url: '/school/delete',
    method: 'delete',
  })
}
