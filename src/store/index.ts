import type { App } from 'vue'
import { createPinia } from 'pinia'

const modules = import.meta.globEager('./modules/**/*.ts')
console.log(modules)
const store = createPinia()

const storeModules: any = {}
Object.keys(modules).forEach((key) => {
  const reg: any = /([a-zA-Z]*)\.ts$/
  const fileName: any = (key.match(reg) as any)[0]
  const ruleName = fileName.split('.')[0]
  console.log(key)
  storeModules[`${ruleName}Store`] = modules[key].setupStore(store)
})
export function useStore () {
  return storeModules
}
export { store }
export function setupStore (app: App<Element>) {
  app.use(store)
}
