import { defineStore } from 'pinia'
import { CustomRouteRecordRaw } from '../../types/router'
import { TabsBarState } from '../../types/vuex'

const useTabsBarStore = defineStore({
  id: 'tabsBar',
  state: (): any => ({
    visitRoutes: []
  }),
  // mutations: {
  //   /**
  //    * @description 删除当前标签页
  //    * @param {*} state
  //    * @param {*} route
  //    * @returns
  //    */
  //   delVisitedRoute (state: TabsBarState, route: CustomRouteRecordRaw): void {
  //     state.visitRoutes.forEach((item: any, index: any) => {
  //       if (item.path === route.path) state.visitRoutes.splice(index, 1);
  //     });
  //   },
  //   /**
  //    * @description 删除当前标签页以外其它全部多标签页
  //    * @param {*} state
  //    * @param {*} route
  //    * @returns
  //    */
  //   delOthersvisitRoutes (state: TabsBarState, route: CustomRouteRecordRaw): void {
  //     state.visitRoutes = state.visitRoutes.filter(
  //       (item: any) => item.meta.affix || item.path === route.path
  //     );
  //   },
  //   /**
  //    * @description 删除当前标签页左边全部多标签页
  //    * @param {*} state
  //    * @param {*} route
  //    * @returns
  //    */
  //   delLeftvisitRoutes (state: TabsBarState, route: CustomRouteRecordRaw): void {
  //     let index = state.visitRoutes.length;
  //     state.visitRoutes = state.visitRoutes.filter((item: any) => {
  //       if (item.name === route.name) index = state.visitRoutes.indexOf(item);
  //       return item.meta.affix || index <= state.visitRoutes.indexOf(item);
  //     });
  //   },
  //   /**
  //    * @description 删除当前标签页右边全部多标签页
  //    * @param {*} state
  //    * @param {*} route
  //    * @returns
  //    */
  //   delRightvisitRoutes (state: TabsBarState, route: CustomRouteRecordRaw): void{
  //     let index = state.visitRoutes.length;
  //     state.visitRoutes = state.visitRoutes.filter((item: any) => {
  //       if (item.name === route.name) index = state.visitRoutes.indexOf(item);
  //       return item.meta.affix || index >= state.visitRoutes.indexOf(item);
  //     });
  //   },
  //   /**
  //    * @description 删除全部多标签页
  //    * @param {*} state
  //    * @param {*} route
  //    * @returns
  //    */
  //   delAllvisitRoutes (state: TabsBarState): void {
  //     state.visitRoutes = state.visitRoutes.filter((item: any) => item.meta.affix);
  //   }

  // },
  actions: {
    /**
   * @description 添加标签页
   * @param {*} { commit }
   * @param {*} route
   */
    addVisitedRoute (route:CustomRouteRecordRaw): void {
      const target = this.visitRoutes.find((item: any) => item.path === route.path)
      if (target) {
        if (route.fullPath !== target.fullPath) Object.assign(target, route)
        return
      }
      this.visitRoutes.push(Object.assign({}, route))
    },
    /**
     * @description 删除当前标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delVisitedRoute (route: CustomRouteRecordRaw): void {
      // commit('delVisitedRoute', route);
    },
    /**
     * @description 删除当前标签页以外其它全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delOthersvisitRoutes (route:CustomRouteRecordRaw): void {
      // commit('delOthersvisitRoutes', route);
    },
    /**
     * @author chuzhixin 1204505056@qq.com
     * @description 删除当前标签页左边全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delLeftvisitRoutes (route:CustomRouteRecordRaw): void {
      // commit('delLeftvisitRoutes', route);
    },
    /**
     * @description 删除当前标签页右边全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delRightvisitRoutes (route:CustomRouteRecordRaw): void {
      // commit('delRightvisitRoutes', route);
    },
    /**
     * @description 删除全部多标签页
     * @param {*} { commit }
     */
    delAllvisitRoutes (): void {
      // commit('delAllvisitRoutes');
    }
  }
})

export function setupStore (store: any) {
  return useTabsBarStore(store)
}
