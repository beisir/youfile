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
      path: '/youlifeSale/index',
      component: () => import('@/views/youlifeManage/youlifeSale/index'),
      name: 'marketingCenter',
      meta: {
        title: 'marketingCenter'
      }
    },
    // {
    //   path: '/youlifeBanner/index',
    //   component: () => import('@/views/youlifeManage/youlifeBanner/index'),
    //   name: 'mallBanner',
    //   meta: {
    //     title: 'mallBanner'
    //   }
    // },
    {
      path: '/recommendGoods/index',
      component: () => import('@/views/youlifeManage/recommendGoods/index'),
      name: 'recommendGoods',
      meta: {
        title: 'recommendGoods'
      }
    },
    {
      path: '/choseGoods/index',
      component: () => import('@/views/youlifeManage/choseGoods/index'),
      name: 'choseGoods',
      meta: {
        title: 'choseGoods'
      }
    },
    {
      path: '/choseStores/index',
      component: () => import('@/views/youlifeManage/choseStores/index'),
      name: 'choseStores',
      meta: {
        title: 'choseStores'
      }
    },
    {
      path: '/hotClasss/index',
      component: () => import('@/views/youlifeManage/hotClasss/index'),
      name: 'hotClasss',
      meta: {
        title: 'hotClasss'
      }
    }
  ]
}

export default youlifeRouter
