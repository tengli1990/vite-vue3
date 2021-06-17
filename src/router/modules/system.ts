import { Component } from '@vue/runtime-core'
import Layout from '@/components/layout/Index.vue'
import { CustomRouteRecordRaw } from '../../types/router'
// import RouteView from '@/components/layout/RouteView.vue';

const system: Array<CustomRouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/account',
    meta: {
      title: '系统管理',
      permission: true
    },
    children: [
      {
        path: 'account',
        name: 'SystemAccount',
        component: (): Component => import('@/sample/system/Account.vue'),
        // component: RouteView,
        meta: {
          title: '账户管理',
          icon: 'icon-as-sever',
          permission: true,
          default: 10
        }
      }
    ]
  }
]

export default system
