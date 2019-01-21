/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const youlifeRouter = {
  path: '/youlifeManage',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  meta: {
    title: 'youlifeManage',
    icon: 'table'
  },
  children: [
    {
      path: '/youlifeBanner/index',
      component: () => import('@/views/youlifeManage/youlifeBanner/index'),
      name: 'mallBanner',
      meta: {
        title: 'mallBanner'
      }
    },
    {
      path: '/youlifeActive/index',
      component: () => import('@/views/youlifeManage/youlifeActive/index'),
      name: 'mallActive',
      meta: {
        title: 'mallActive'
      }
    },
    {
      path: '/youlifeSale/index',
      component: () => import('@/views/youlifeManage/youlifeSale/index'),
      name: 'mallSale',
      meta: {
        title: 'mallSale'
      }
    }
  ]
}

export default youlifeRouter
