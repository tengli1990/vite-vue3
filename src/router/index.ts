
import { createRouter, createWebHistory } from 'vue-router'
// import { CustomRouteRecordRaw } from '../types/router';
import { Component } from '@vue/runtime-core'
import Layout from '../components/layout/Index.vue'
import RouteView from '../components/layout/RouteView.vue'

import indexRoute from './modules/index'
import featRoute from './modules/feat'
import compRoute from './modules/comp'
import systemRoute from './modules/system'
export const constantRoutes: Array<any> = [
  {
    path: '/login',
    component: () => import('@/views/user/Login.vue'),
    hidden: true,
    meta: {
      verification: false
    }
  }

  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/views/failed/404.vue'),
  //   hidden: true
  // }
]

export const asyncRoutes: Array<any> = [
  ...indexRoute,
  ...featRoute,
  ...compRoute,
  ...systemRoute
  // {
  //   path: '/demo',
  //   component: Layout,
  //   redirect: '/index',
  //   meta: {
  //     title: 'demo',
  //     permission: true
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'DemoIndex',
  //       component: (): Component => import('@/views/index/Index.vue'),
  //       meta: {
  //         title: 'hahha',
  //         icon: 'icon-as-sever',
  //         permission: true,
  //         default: 10
  //       }
  //     },
  //     {
  //       path: 'index1',
  //       name: 'DemoIndex1',
  //       component: (): Component => import('@/views/failed/404.vue'),
  //       meta: {
  //         title: 'hahha',
  //         icon: 'icon-as-sever',
  //         permission: true,
  //         default: 10
  //       }
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
