/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: 'noredirect',
  name: 'order',
  meta: {
    title: 'order',
    icon: 'table'
  },
  children: [
    {
      path: 'orderManage',
      name: 'OrderManage',
      component: () => import('@/views/order/orderManage/index'), // Parent router-view
      meta: { title: 'orderManage' }
    },
    {
      path: 'supplyManage',
      name: 'SupplyManage',
      component: () => import('@/views/order/supplyManage/index'),
      meta: { title: 'supplyManage' }
    }
  ]
}

export default orderRouter
