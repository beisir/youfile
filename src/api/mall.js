import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/mall/list',
    method: 'get',
    data: params
  })
}
export function getMallMes(mallCode) {
  return request({
    url: '/mall/info/' + mallCode,
    method: 'get'
  })
}
export function updateMall(params) {
  return request({
    url: '/mall',
    method: 'put',
    data: params
  })
}
