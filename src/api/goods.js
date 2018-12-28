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
export function deteleClass(categoryCode) {
  return request({
    url: '/shop/category/' + categoryCode,
    method: 'delete'
  })
}
export function getClassDetails(categoryCode) {
  return request({
    url: '/shop/category/info/' + categoryCode,
    method: 'get'
  })
}
export function saveClass(params) {
  return request({
    url: '/shop/category/save',
    method: 'post',
    data: params
  })
}
export function updateClass(params) {
  return request({
    url: '/shop/category/update',
    method: 'put',
    data: params
  })
}

