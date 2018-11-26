/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const orderRouter = {
  path: '/pay',
  component: Layout,
  redirect: 'noredirect',
  name: 'Pay',
  meta: {
    title: 'pay',
    icon: 'component'
  },
  children: [
    {
      path: 'network',
      name: 'Network',
      component: () => import('@/views/pay/network/index'), // Parent router-view
      meta: { title: 'network' }
    },
    {
      path: 'billList',
      name: 'BillList',
      component: () => import('@/views/pay/billList/index'),
      meta: { title: 'billList' }
    },
    {
      path: 'rateSet',
      name: 'RateSet',
      component: () => import('@/views/pay/rateSet/index'),
      meta: { title: 'rateSet' }
    },
    {
      path: 'accountSet',
      name: 'AccountSet',
      component: () => import('@/views/pay/accountSet/index'),
      meta: { title: 'accountSet' }
    },
    {
      path: 'refund',
      name: 'Refund',
      component: () => import('@/views/pay/refund/index'),
      meta: { title: 'refund' }
    }
  ]
}

export default orderRouter
