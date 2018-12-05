import request from '@/utils/request'
import request_upload_api from '@/utils/request_upload'

export function getList(params) {
  return request({
    url: '/merchant/list/wholesale',
    method: 'post',
    data: params
  })
}
export function getListRetail(params) {
  return request({
    url: '/merchant/list/retail',
    method: 'post',
    data: params
  })
}
export function getListMerchantRetail(params) {
  return request({
    url: '/merchant/list',
    method: 'post',
    data: params
  })
}
export function getMerchantRetail(params) {
  return request({
    url: '/merchant/detail/' + params,
    method: 'get'
  })
}
export function editMerchantRetail(params) {
  return request({
    url: '/merchant/detail/',
    method: 'put',
    data: params
  })
}
export function getImgUrl(params) {
  return request_upload_api({
    url: '/base/image/sign',
    method: 'get',
    params
  })
}
export function uploadImgUrl(params) {
  return request_upload_api({
    url: '/base/image',
    method: 'post',
    data: params
  })
}
export function getProvinceList(params) {
  return request({
    url: '/district/type/province',
    method: 'get',
    params
  })
}
export function getCityChildList(params) {
  return request({
    url: '/district/parentcode',
    method: 'get',
    params
  })
}
export function getHeadbankList(params) {
  return request({
    url: '/headbank/' + params.bankName,
    method: 'get',
    params
  })
}
export function getSmallbankList(params) {
  return request({
    url: '/subbank/' + params.headBankCode,
    method: 'get',
    params
  })
}
export function getStoreMes(merchantNumber) {
  return request({
    url: '/merchant/miniprogram/' + merchantNumber + '/list',
    method: 'get'
  })
}
export function saveupdate(params) {
  return request({
    url: '/merchant/miniprogram/saveupdate',
    method: 'post',
    data: params
  })
}

