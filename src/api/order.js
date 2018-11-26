import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/role',
    method: 'get',
    params
  })
}
