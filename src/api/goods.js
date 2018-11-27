import request from '@/utils/request'

export function getList(parentCategoryCode) {
  console.log(parentCategoryCode)
  return request({
    url: '/shop/category/sublist/' + parentCategoryCode,
    method: 'get'
  })
}
