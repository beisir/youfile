import request from '@/utils/request'

export function getAllList(type, data) {
  return request({
    url: '/yunstore/order/yunstoreorderlist',
    method: 'get',
    params: data
  })
}

export function getDetail(code) {
  if (!code) { alert('缺少code') }
  return request({
    url: '/yunstore/order/byordernumber/' + code,
    method: 'get'
  })
}

export function openStore(code) {
  if (!code) { alert('缺少orderNumber') }
  return request({
    url: '/yunstore/order/admin/yunstore/' + code + '/open/store',
    method: 'post'
  })
}
