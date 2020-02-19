import request from '../request'

export function getBillboardList() {
  return request({
    url: '/billboard/list',
    method: 'get',
  })
}

export function deleteBillboard(data) {
  return request({
    url: '/billboard/delete',
    method: 'delete',
    data,
  })
}

export function updateBillboard(data) {
  return request({
    url: '/billboard/update',
    method: 'put',
    data,
  })
}
