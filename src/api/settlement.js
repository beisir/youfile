import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/settle/account/list',
    method: 'get',
    params
  })
}
export function getAccountList(params) {
  return request({
    url: '/settle/account/in/' + params.merchantNumber,
    method: 'get',
    params
  })
}
export function getAccountOutList(params) {
  return request({
    url: '/settle/account/out/' + params.merchantNumber,
    method: 'get',
    params
  })
}

