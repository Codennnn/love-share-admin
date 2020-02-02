import Qs from 'qs'
import request from '../request'

export function getOrderList(params) {
  return request({
    url: '/order/list',
    method: 'get',
    params,
  })
}

export function getOrderListByDateRange(params) {
  return request({
    url: '/order/list_by_date_range',
    method: 'get',
    params,
    paramsSerializer(param) {
      return Qs.stringify(param, { indices: false })
    },
  })
}

export function getOrderDetail(params) {
  return request({
    url: '/order/detail',
    method: 'get',
    params,
  })
}

// 交易额
export function getOrderTransactionAmount() {
  return request({
    url: '/order/transaction',
    method: 'get',
  })
}
// 成交量
export function getOrderVolume() {
  return request({
    url: '/order/volume',
    method: 'get',
  })
}
// 订单数
export function getOrderNum() {
  return request({
    url: '/order/num',
    method: 'get',
  })
}
