import request from '@/utils/request'

export function getAllList(type, data) {
  const t = type || 'all'
  return request({
    url: '/yunstore/order/merchant/orderStatus/' + t,
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
