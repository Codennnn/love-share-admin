import request from '../request'

export function getSchoolList() {
  return request({
    url: '/school/list',
    method: 'get',
  })
}

export function addSchool() {
  return request({
    url: '/school/add',
    method: 'post',
  })
}

export function deleteSchool() {
  return request({
    url: '/school/delete',
    method: 'delete',
  })
}
