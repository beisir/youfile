/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const goodsRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/goodsManage',
  name: 'Goods',
  meta: {
    title: 'goods',
    icon: 'theme'
  },
  children: [
    {
      path: 'goodsManage',
      name: 'GoodsManage',
      component: () => import('@/views/goods/goodsManage/index'), // Parent router-view
      meta: { title: 'goodsManage' }
    },
    {
      path: 'classManage',
      name: 'ClassManage',
      component: () => import('@/views/goods/classManage/index'),
      meta: { title: 'classManage' }
    },
    {
      path: 'bindList',
      name: 'BindList',
      component: () => import('@/views/goods/classManage/bindList'),
      meta: { title: 'bindList' },
      hidden: true
    }
  ]
}

export default goodsRouter
