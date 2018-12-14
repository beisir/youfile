import request from '@/utils/request'
export function getMerchantList(params) {
  return request({
    url: '/register/merchant/list',
    method: 'get',
    params
  })
}
export function getMerchantDetails(params) {
  return request({
    url: '/register/merchant/' + params,
    method: 'get'
  })
}
export function yeepayRegister(params) {
  return request({
    url: '/register/merchant/yeepay/ledger/register',
    method: 'post',
    data: params
  })
}
export function yeepaySubRegister(params) {
  return request({
    url: '/register/merchant/yeepay/sub/register',
    method: 'post',
    data: params
  })
}
export function getYeepayList(params) {
  return request({
    url: '/yeepay/config/yeepay/list',
    method: 'get',
    params
  })
}
export function updateYeepayMes(params) {
  return request({
    url: '/yeepay/config',
    method: 'put',
    data: params
  })
}
export function addYeepay(params) {
  return request({
    url: '/yeepay/config',
    method: 'post',
    data: params
  })
}
