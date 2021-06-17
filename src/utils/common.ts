import moment from 'moment'
const useCommon = {
  $testa: 'a',
  $moment: moment
}
export function setupCommon (app) {
  Object.keys(useCommon).forEach((key: string) => {
    app.config.globalProperties[key] = useCommon[key]
  })
  app.config.globalProperties.$testFn = (a: any): void => {
    console.log(a)
  }
}
