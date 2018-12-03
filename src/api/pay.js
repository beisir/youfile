import request from '@/utils/request'
export function getProvinceList() {
  return request({
    url: '/district/type/province?pageNum=1&pageSize=50',
    method: 'get'
  })
}
