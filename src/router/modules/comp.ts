import { CustomRouteRecordRaw } from '../../types/router'
import { Component } from '@vue/runtime-core'
import Layout from '@/components/layout/Index.vue'
// import RouteView from '../components/layout/RouteView.vue';

const comp: Array<CustomRouteRecordRaw> = [
  {
    path: '/comp',
    component: Layout,
    redirect: '/comp/chart',
    meta: {
      icon: 'icon-as-sever',
      title: '组件',
      permission: true
    },
    children: [
      {
        path: 'chart',
        name: 'CompChart',
        component: (): Component => import('@/sample/comp/Chart.vue'),
        meta: {
          title: '图表',
          permission: true,
          default: 10
        }
      },
      {
        path: 'json-tree',
        name: 'CompJsonTree',
        component: (): Component => import('@/sample/comp/JsonTree.vue'),
        meta: {
          title: '数据树',
          permission: true,
          default: 10
        }
      },
      {
        path: 'basic',
        name: 'CompBasic',
        component: (): Component => import('@/sample/comp/Basic.vue'),
        meta: {
          title: '基础组件',
          permission: true,
          default: 10
        }
      }
    ]
  }
]

export default comp
