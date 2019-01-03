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
// banner
export function getBannerList(params) {
  return request({
    url: '/banner/list',
    method: 'get',
    params
  })
}
export function getBannerMes(id) {
  return request({
    url: '/banner/info/' + id,
    method: 'get'
  })
}
export function updateBanner(params) {
  return request({
    url: '/banner',
    method: 'put',
    data: params
  })
}
export function addBanner(params) {
  return request({
    url: '/banner',
    method: 'post',
    data: params
  })
}
// 楼层
export function getFloorList(mallCode) {
  return request({
    url: '/floor/tree/' + mallCode,
    method: 'get'
  })
}
export function saveFloor(params) {
  return request({
    url: '/floor',
    method: 'post',
    data: params
  })
}
export function getFloorDetails(floorCode) {
  return request({
    url: '/floor/info/' + floorCode,
    method: 'get'
  })
}
export function updateloor(params) {
  return request({
    url: '/floor',
    method: 'put',
    data: params
  })
}
export function deteleFloor(floorCode) {
  return request({
    url: '/floor/' + floorCode,
    method: 'delete'
  })
}
