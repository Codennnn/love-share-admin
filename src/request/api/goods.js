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

export function getGoodsListByDateRange(data) {
  return request({
    url: '/goods/list/by_date_range',
    method: 'post',
    data,
  })
}

export function getGoodsListBySelect(params) {
  return request({
    url: '/goods/list/by_school_or_category_admin',
    method: 'get',
    params,
  })
}

export function getGoodsListBySearchAdmin(params) {
  return request({
    url: '/goods/list/by_search_admin',
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

export function updateManyGoods(data) {
  return request({
    url: '/goods/update_many',
    method: 'put',
    data,
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

export function changeGoodsComments(data) {
  return request({
    url: '/goods/comment/change',
    method: 'put',
    data,
  })
}
