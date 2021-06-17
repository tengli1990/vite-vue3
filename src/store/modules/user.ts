import { defineStore, Store } from 'pinia'
import { getUserInfo, login, logout } from '../../apis/user'
import { LoginParameters } from '../../types/login'
import { ResponseData } from '../../types/request'
import { removeToken, removeUser, setToken, setUser } from '../../utils/token'
// TODO:fix this
// interface UserState { }
export const useUserStore = defineStore({
  id: 'users',
  state: (): any => ({
    user: null,
    permissions: null,
    token: ''
  }),
  getters: {
    getUser (): any {
      return this.user
    },
    getPermissions (): any {
      return this.permissions
    }
  },
  actions: {
    handleLogin (paramter : LoginParameters): Promise<any> {
      return new Promise((resolve, reject) => {
        login(paramter).then((res: ResponseData) => {
          if (res.code !== '0000') {
            // message.error(res.msg)
            resolve(res)
            return
          }
          const { token } = res.data
          // 设置 token
          this.token = token
          setToken(token)

          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogout (): Promise<any> {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          // 清除 Cookie 中的 token
          removeToken()
          removeUser()
          this.user = null
          setUser(null)
          // 跳转sso
          // redirectToSSOPage()
          // window.location.reload()
          resolve(null)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    getUserInfo (): Promise<any> {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res: ResponseData) => {
          const data = res.data
          // 操作用户信息
          this.user = data
          setUser(data)
          console.log(data)
          // waterMark.set([data.name, data.mobile]);
          const defaultPermissions: string[] = ['test-demo']
          const rolePermissionsList = data.resources.concat(defaultPermissions)
          window.localStorage.setItem('ROLE_PERMISSIONS_LIST', JSON.stringify(rolePermissionsList))
          // 操作用户信息
          this.permissions = rolePermissionsList
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})

// Need to be used outside the setup
export function setupStore (store: any) {
  return useUserStore(store)
}
