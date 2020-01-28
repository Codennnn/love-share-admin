import request from '../request'

export function getGoodsList() {
  return request({
    url: '/goods/list',
    method: 'get',
  })
}

export function getGoodsListOnSell(params) {
  return request({
    url: '/goods/list/on_sell',
    method: 'get',
    params,
  })
}

export function getGoodsListOffSell(params) {
  return request({
    url: '/goods/list/off_sell',
    method: 'get',
    params,
  })
}

export function getGoodsListInfo() {
  return request({
    url: '/goods/list/info',
    method: 'get',
  })
}

export function getGoodsDetail(params) {
  return request({
    url: '/goods/detail',
    method: 'get',
    params,
  })
}

export function deleteGoods() {
  return request({
    url: '/goods/delete',
    method: 'delete',
  })
}

export function dismountGoods() {
  return request({
    url: '/goods/dismount',
    method: 'post',
  })
}

export function cancelDismountGoods() {
  return request({
    url: '/goods/cancel_dismount',
    method: 'post',
  })
}

export function getGoodsSeller(params) {
  return request({
    url: '/goods/seller',
    method: 'get',
    params,
  })
}

export function getGoodsComments(params) {
  return request({
    url: '/goods/comments',
    method: 'get',
    params,
  })
}
