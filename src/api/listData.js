import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/account/check/mistake/page',
    method: 'get',
    params
  })
}
export function getSettleList(params) {
  return request({
    url: '/settle/page',
    method: 'get',
    params
  })
}
export function getBatchList(params) {
  return request({
    url: '/divide/batch/page',
    method: 'get',
    params
  })
}
export function getBatchDetails(params) {
  return request({
    url: '/divide/detail/page',
    method: 'get',
    params
  })
}
export function confirmBatch(params) {
  return request({
    url: '/divide/detail/divide/query',
    method: 'get',
    params
  })
}
export function divideBatch(params) {
  return request({
    url: '/divide/detail/divide/confirm?divideDetailNumber=' + params,
    method: 'get'
  })
}
// export function getPurchaserList(params) {
//   return request({
//     url: '/purchaser/list',
//     method: 'post',
//     data: params
//   })
// }
// export function getUserDetails(userId) {
//   return request({
//     url: '/puser/info/' + userId,
//     method: 'get'
//   })
// }
// export function updateUserPhone(params) {
//   return request({
//     url: '/puser',
//     method: 'put',
//     data: params
//   })
// }

