import request from '@/utils/request'
export function getPosterList(params) {
  return request({
    url: '/marketing/poster/template/list',
    method: 'get',
    params
  })
}

export function delPosterTag(data) {
  return request({
    url: '/marketing/poster/template',
    method: 'delete',
    data
  })
}
