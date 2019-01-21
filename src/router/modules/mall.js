/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const mallRouter = {
  path: '/mallManage',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  meta: {
    title: 'mallManage',
    icon: 'table'
  },
  children: [
    {
      path: '/mallManage/index',
      component: () => import('@/views/mallManage/mallList/index'),
      name: 'mallList',
      meta: {
        title: 'mallList'
      }
    },
    {
      path: '/bannerManage/index',
      component: () => import('@/views/mallManage/bannerManage/index'),
      name: 'bannerManage',
      meta: {
        title: 'bannerManage'
      }
    },
    {
      path: '/mallBanner/index',
      component: () => import('@/views/mallManage/mallBanner/index'),
      name: 'mallBanner',
      meta: {
        title: 'mallBanner'
      },
      hidden: true
    },
    {
      path: '/activeManage/index',
      component: () => import('@/views/mallManage/activeManage/index'),
      name: 'activeManage',
      meta: {
        title: 'activeManage'
      }
    },
    {
      path: '/mallActive/index',
      component: () => import('@/views/mallManage/mallActive/index'),
      name: 'mallActive',
      meta: {
        title: 'mallActive'
      },
      hidden: true
    },
    {
      path: '/mallSale/index',
      component: () => import('@/views/mallManage/mallSale/index'),
      name: 'mallSale',
      meta: {
        title: 'mallSale'
      }
    },
    {
      path: '/floorMes/index',
      component: () => import('@/views/mallManage/floorMes/index'),
      name: 'floorMes',
      meta: {
        title: 'floorMes'
      },
      hidden: true
    },
    {
      path: '/floorMes/floorStoreList',
      component: () => import('@/views/mallManage/floorMes/floorStoreList'),
      name: 'floorStoreList',
      meta: {
        title: 'floorStoreList'
      },
      hidden: true
    },
    {
      path: '/floorManage/index',
      component: () => import('@/views/mallManage/floorManage/index'),
      name: 'floorManage',
      meta: {
        title: 'floorManage'
      }
    }
  ]
}

export default mallRouter
