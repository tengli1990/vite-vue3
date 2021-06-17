import router from '../router/index'
import { useStore } from '../store'
import NProgress from 'nprogress' // progress bar
// import '@/assets/styles/nprogress.less'; // progress bar custom style
// import { setDocumentTitle, domTitle } from '@/utils';
import { getToken } from '../utils/token'
import { toRaw } from 'vue'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

NProgress.configure({ showSpinner: true }) // NProgress Configuration
NProgress.start()
const { userStore, routesStore } = useStore()

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext):Promise<any> => {
  // 设置标题
  // to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${domTitle} - ${to.meta.title}`));
  // 加载不需要验证登录和授权的页面
  if (to.meta.verification === false) {
    next()
    return
  }
  const token = getToken()
  const user = toRaw(userStore.getUser)
  const permissions = toRaw(userStore.getPermissions) // ['dashboard-111', 'dashboard-222']
  if (token) {
    if (user != null && permissions != null) {
      next()
    } else {
      // 有 token 无 user 信息, 通常在登录后在页面刷新的情况, 通过getUserInfo拿user信息
      await userStore.getUserInfo(token)
      const routes = await routesStore.setRoutes(toRaw(userStore.getPermissions))
      console.log(111, routes)
      // router.addRoute(routes); // 通过获取到的权限来动态添加路由
      routes.forEach((route: any) => {
        router.addRoute(route)
      })
      next()
      router.replace(to)
    }
  } else {
    const currentRoute = document.URL.split(location.host)[1]
    next({
      path: '/login',
      query: {
        redirect: encodeURIComponent(currentRoute)
      }
    })
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
