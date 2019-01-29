import request from '@/utils/request'

// banner
export function getBannerList(params) {
  return request({
    url: '/youlife/banner/list',
    method: 'get',
    params
  })
}
export function getBannerMes(id) {
  return request({
    url: '/youlife/banner/info/' + id,
    method: 'get'
  })
}
export function updateBanner(params) {
  return request({
    url: '/youlife/banner',
    method: 'put',
    data: params
  })
}
export function removeBanner(id) {
  return request({
    url: '/youlife/banner/' + id,
    method: 'delete'
  })
}
export function addBanner(params) {
  return request({
    url: '/youlife/banner',
    method: 'post',
    data: params
  })
}
// 活动
export function getActiveList(params) {
  return request({
    url: '/youlife/activity/list',
    method: 'get',
    params
  })
}
export function getActiveMes(id) {
  return request({
    url: '/youlife/activity/info/' + id,
    method: 'get'
  })
}
export function updateActive(params) {
  return request({
    url: '/youlife/activity',
    method: 'put',
    data: params
  })
}
export function removeActive(id) {
  return request({
    url: '/youlife/activity/' + id,
    method: 'delete'
  })
}
export function addActive(params) {
  return request({
    url: '/youlife/activity',
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
export function getFloorStore(params) {
  return request({
    url: '/floor/store',
    method: 'get',
    params
  })
}
export function removeStoreFloor(storeId) {
  return request({
    url: '/floor/store/' + storeId,
    method: 'delete'
  })
}
export function editStoreFloor(params) {
  return request({
    url: '/floor/store/add',
    method: 'post',
    data: params
  })
}
export function getFloorInfo(params) {
  return request({
    url: '/floor/store/name',
    method: 'get',
    params
  })
}
// 推荐好物
export function recommendList(mallCode) {
  return request({
    url: '/youlife/config/info/' + mallCode + '/recommend/good/things',
    method: 'get'
  })
}
// 销售配置
export function updateSale(params) {
  return request({
    url: '/youlife/sale/config',
    method: 'put',
    data: params
  })
}
export function addSale(params) {
  return request({
    url: '/youlife/sale/config',
    method: 'post',
    data: params
  })
}
// 销售配置
export function getSaleList(params) {
  return request({
    url: '/youlife/sale/config/list',
    method: 'get',
    params
  })
}
export function getSaleDetails(id) {
  return request({
    url: '/youlife/sale/config/info/' + id,
    method: 'get'
  })
}

// 分类
export function hotClassList(mallCode) {
  return request({
    url: '/youlife/config/info/' + mallCode + '/hot/category',
    method: 'get'
  })
}
export function getClassList(parentCategoryCode) {
  return request({
    url: '/shop/category/sublist/' + parentCategoryCode,
    method: 'get'
  })
}
// 精选商品
export function chosenGoodsList(owner) {
  return request({
    url: '/youlife/config/info/' + owner + '/chosen/goods',
    method: 'get'
  })
}
// 精选店铺
export function chosenStoreList(owner) {
  return request({
    url: '/youlife/config/info/' + owner + '/chosen/store',
    method: 'get'
  })
}
