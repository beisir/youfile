import request from '@/utils/request'

export function getClssOne(data) {
  return request({
    url: '/industry/top',
    method: 'get',
    params: data
  })
}

export function getClssTwo(data) {
  return request({
    url: '/industry/' + data.parentCode + '/next',
    method: 'get',
    params: data
  })
}
