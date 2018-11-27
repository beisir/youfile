import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/puser/list',
    method: 'post',
    data: params
  })
}
export function getPurchaserList(params) {
  return request({
    url: '/purchaser/list',
    method: 'post',
    data: params
  })
}

