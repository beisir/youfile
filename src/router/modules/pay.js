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
      path: 'menu1',
      component: () => import('@/views/pay/accountSet/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: 'menu1' },
      redirect: 'noredirect',
      children: [
        {
          path: 'yibaoMerchantsOnline',
          name: 'YibaoMerchantsOnline',
          component: () => import('@/views/pay/yibaoMerchantsOnline/index'), // Parent router-view
          meta: { title: 'yibaoMerchantsOnline' }
        },
        {
          path: 'yibaoBranchOnline',
          name: 'YibaoBranchOnline',
          component: () => import('@/views/pay/yibaoBranchOnline/index'), // Parent router-view
          meta: { title: 'yibaoBranchOnline' }
        },
        {
          path: 'yibaoPaySet',
          name: 'YibaoPaySet',
          component: () => import('@/views/pay/yibaoPaySet/index'), // Parent router-view
          meta: { title: 'yibaoPaySet' }
        },
        {
          path: 'settlementList',
          name: 'SettlementList',
          component: () => import('@/views/pay/settlementList/index'), // Parent router-view
          meta: { title: 'settlementList' }
        },
        {
          path: 'batchList',
          name: 'BatchList',
          component: () => import('@/views/pay/batchList/index'), // Parent router-view
          meta: { title: 'batchList' }
        },
        {
          path: 'batchDetails',
          name: 'BatchDetails',
          component: () => import('@/views/pay/batchList/details'), // Parent router-view
          meta: { title: 'batchDetails' },
          hidden: true
        }
      ]
    },
    {
      path: 'yibaoOnlineDetails',
      name: 'YibaoOnlineDetails',
      component: () => import('@/views/pay/yibaoMerchantsOnline/details'), // Parent router-view
      meta: { title: 'yibaoOnlineDetails' },
      hidden: true
    },
    {
      path: 'yibaoSubDetails',
      name: 'YibaoSubDetails',
      component: () => import('@/views/pay/yibaoBranchOnline/details'), // Parent router-view
      meta: { title: 'yibaoSubDetails' },
      hidden: true
    },
    {
      path: 'accountManage',
      name: 'AccountManage',
      component: () => import('@/views/pay/accountManage/index'), // Parent router-view
      meta: { title: 'accountManage' }
    },
    {
      path: 'historyList',
      name: 'HistoryList',
      component: () => import('@/views/pay/accountManage/historyList'), // Parent router-view
      meta: { title: 'historyList' },
      hidden: true
    },
    {
      path: 'billList',
      name: 'BillList',
      component: () => import('@/views/pay/billList/index'),
      meta: { title: 'billList' }
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
