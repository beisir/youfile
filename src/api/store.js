import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/store/list/wholesale',
    method: 'post',
    data: params
  })
}
export function getListRetail(params) {
  return request({
    url: '/store/list/retail',
    method: 'post',
    data: params
  })
}
export function getStoreMes(storeId) {
  return request({
    url: '/store/' + storeId,
    method: 'get'
  })
}
export function UpdateStoreMes(params) {
  return request({
    url: '/store',
    method: 'put',
    data: params
  })
}
export function UpdateStoreLogo(params) {
  return request({
    url: '/store/' + params.storeId + '/logo',
    method: 'put',
    params
  })
}
