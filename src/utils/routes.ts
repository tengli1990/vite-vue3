import { CustomRedirectRoute, CustomRouteRecordRaw } from '../types/router'
import { isExternal } from '../utils/validate'
import { RouteMeta } from 'vue-router'
/**
 * @description 根据roles数组拦截路由
 * @param routes
 * @param baseUrl
 * @returns {[]}
 */

function resolve (s1: string, s2: string): string {
  let ret: string
  if (s2.charAt(0) !== '/') {
    ret = (s1 + '/' + s2).replace(/\/\//g, '/')
  } else {
    ret = (s1 + s2).replace(/\/\//g, '/')
  }
  return ret
}

export function setFulPath (routes: CustomRouteRecordRaw[], baseUrl = '/'): CustomRouteRecordRaw[] {
  return routes.map((route: any) => {
      if (route.path === '/:pathMatch(.*)*' || isExternal(route.path)) {
        return route
      }
      route.path = resolve(baseUrl, route.path)
      route.fullPath = route.path

      if (route.children) {
        route.children = setFulPath(route.children, route.fullPath)
      }
      return route
    })
}

export function filterRoutes (routes: CustomRouteRecordRaw[], access: string[] = []): CustomRouteRecordRaw[] {
  const result: CustomRouteRecordRaw[] = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasRouteAccess(access, tmp)) {
      if (tmp.children) {
        tmp.children = filterRoutes(tmp.children, access)
      }
      result.push(tmp)
    }
  })

  return result
}

/**
 * 通过 路由的 mapping 关系判断是否有权访问
 * @param {*} access
 * @param {*} route
 */
function hasRouteAccess (access: string[], route: CustomRouteRecordRaw) {
  const routeMeta: RouteMeta = route.meta && route.meta || {}
  const hasAccess = access.find(item => routeMeta.permission && routeMeta.permission === item)
  console.log(hasAccess, route.meta)
  if (hasAccess || routeMeta.permission === true) {
    return true
  } else if (hasAccess === undefined) {
    return false
  }
}

/**
 * 默认加载重定向排序
 * @param {*} routes 路由
 * @returns
 */
export function defaultRoutesSort (routes: CustomRouteRecordRaw[]): any {
  let defaultRoutes: CustomRedirectRoute[] = []
  const handleFn = (list: CustomRouteRecordRaw[]): void => {
    list.forEach(item => {
      const { children = [], meta = {}, path } = item
      if (meta.default || meta.default === 0) {
        defaultRoutes.push(
          {
            permission: meta.permission,
            path,
            index: Number(meta.default)
          })
      }
      if (children.length) {
        handleFn(children)
      }
    })
  }
  handleFn(routes)

  const compare = (property: string) => {
    return function (a: any, b: any) {
      return (a[property] - b[property])
    }
  }
  defaultRoutes = defaultRoutes.sort(compare('index'))
  return defaultRoutes
}
