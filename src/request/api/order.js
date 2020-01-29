import request from '../request'

export function getOrderList(params) {
  return request({
    url: '/order/list',
    method: 'get',
    params,
  })
}

export function getOrderDetail(params) {
  return request({
    url: '/order/detail',
    method: 'get',
    params,
  })
}

export function getOrderTransactionAmount() {
  return request({
    url: '/order/transaction',
    method: 'get',
  })
}

export function getOrderVolume() {
  return request({
    url: '/order/volume',
    method: 'get',
  })
}

export function getOrderNum() {
  return request({
    url: '/order/num',
    method: 'get',
  })
}
