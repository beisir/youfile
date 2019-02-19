import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/settle/account/detail/' + params.merchantNumber,
    method: 'get',
    params
  })
}
