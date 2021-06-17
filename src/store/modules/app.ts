import { useTheme } from '@/utils/theme'
import { defineStore } from 'pinia'
// import { store } from '..'

// TODO:fix this
// interface AppState { }
export const useAppStore = defineStore({
  id: 'app',
  state: (): any => ({
    siderWidth: 250,
    theme: window.localStorage.getItem('APP_THEME') || 'light'
  }),
  getters: {
    getSiderWidth (): number {
      return this.siderWidth
    },
    getTheme (): number {
      return this.theme
    }
  },
  actions: {
    setSiderWidth (value: number | string): void {
      this.siderWidth = value
    },
    setTheme (value: string):void {
      window.localStorage.setItem('APP_THEME', value)
      this.theme = value
      useTheme(value)
    }
  }
})

// Need to be used outside the setup

export function setupStore (store: any) {
  return useAppStore(store)
}
