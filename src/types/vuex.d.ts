import { CustomRouteRecordRaw } from './router'

/**
 * @module app
 */
export interface AppLocalState {
  locale: any
  localeName: string,
  siderWidth: number|string
}
export interface AppState {
  app: AppLocalState
}

/**
 * @module user
 */
export interface UserInfoState {
  name: string
  mobild: number
}
export interface UserState {
  user: UserInfoState
  permissions: string[]
  token: string
}

/**
 * @module tabsBar
 */
export interface TabsBarState {
  visitRoutes: CustomRouteRecordRaw[]
}
