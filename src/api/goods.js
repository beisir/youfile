import request from '@/utils/request'
export function getClassList() {
  return request({
    url: '/shop/category/tree',
    method: 'get'
  })
}
export function getGoodsList(params) {
  return request({
    url: '/goods/list',
    method: 'post',
    data: params
  })
}
