import { defineStore, Store } from 'pinia'
import { asyncRoutes } from '../../router'
import { defaultRoutesSort, filterRoutes, setFulPath } from '../../utils/routes'
// TODO:fix this
export const useRoutesStore = defineStore({
  id: 'routes',
  state: (): any => ({
    routes: []
  }),
  getters: {
    getRoutes (): any {
      return this.routes
    }
  },
  actions: {
    setRoutes (access: string[]): Promise<any> {
      console.log(access)
      return new Promise((resolve: any) => {
        const newRoutes = setFulPath(asyncRoutes)
        const availableRoutes = filterRoutes(newRoutes, access)
        // 404 重定向 排序
        const defaultRoutes = defaultRoutesSort(asyncRoutes)
        // 插入默认重定向页面
        for (const item of defaultRoutes) {
          const { permission, path } = item
          if (access.includes(permission) || permission === true) {
            availableRoutes.push({ path: '/:pathMatch(.*)*', redirect: path, hidden: true, meta: { permission: true } })
            break
          }
        }

        // 如果没有配置重定向页面则返回404
        if (defaultRoutes.length === 0) {
          availableRoutes.push({ path: '/:pathMatch(.*)*', redirect: '/404', hidden: true, meta: { permission: true } })
        }
        this.routes = availableRoutes
        resolve(availableRoutes)
      })
    }
  }
})

// Need to be used outside the setup
export function setupStore (store: any) {
  return useRoutesStore(store)
}
