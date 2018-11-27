import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/merchant/list/wholesale',
    method: 'post',
    data: params
  })
}
export function getListRetail(params) {
  return request({
    url: '/merchant/list/retail',
    method: 'post',
    data: params
  })
}
