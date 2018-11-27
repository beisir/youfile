import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/mall/list',
    method: 'get',
    data: params
  })
}
