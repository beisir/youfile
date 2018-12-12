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
