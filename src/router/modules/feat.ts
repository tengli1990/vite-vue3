import { Component } from '@vue/runtime-core'
import Layout from '@/components/layout/Index.vue'
import { CustomRouteRecordRaw } from '../../types/router'
// import RouteView from '../components/layout/RouteView.vue';

const feat: Array<CustomRouteRecordRaw> = [
  {
    path: '/feat',
    component: Layout,
    redirect: '/feat/icon',
    meta: {
      icon: 'icon-as-sever',
      title: '功能',
      permission: true
    },
    children: [
      {
        path: 'icon',
        name: 'FeatIcon',
        component: (): Component => import('@/sample/feat/Icon.vue'),
        meta: {
          title: '图标',
          permission: true,
          default: 10
          // affix: true
        }
      },
      {
        path: 'full-screen',
        name: 'FeatFullScreen',
        component: ():Component => import('@/sample/feat/FullScreen.vue'),
        meta: {
          title: '全屏',
          permission: true,
          default: 10
        }
      },
      {
        path: 'download',
        name: 'FeatDownload',
        component: (): Component => import('@/sample/feat/Download.vue'),
        meta: {
          title: '下载',
          permission: true,
          default: 10
        }
      },
      {
        path: 'export-xlsx',
        name: 'FeatExportXlsx',
        component: (): Component => import('@/sample/feat/Xlsx.vue'),
        meta: {
          title: '导出xlsx',
          permission: true,
          default: 10
        }
      }
    ]
  }
]

export default feat
