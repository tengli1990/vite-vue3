
import { ResponseData } from '../types/request'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from './token'
import { Modal, notification } from 'ant-design-vue'
import router from '@/router'
import { useStore } from '@/store'

const request: AxiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.token = getToken()
  return config
}, errorHandler)

request.interceptors.response.use((res: AxiosResponse<any>): AxiosResponse<ResponseData> | Promise<AxiosResponse<ResponseData>> => {
  const responseData: AxiosResponse<ResponseData> = res.data
  return responseData
}, errorHandler)

// 异常拦截处理器
function errorHandler (error) {
  if (!error.response) {
    // TODO: 是否需要换成确认框重新刷新的操作
    notification.error({
      message: '请求超时',
      description: `${error.toString()}`
    })
    return Promise.reject(error)
  }
  // const data = error.response.data
  // 从 localstorage 获取 token
  const token = getToken()
  const statusCode = error.response.status

  switch (statusCode) {
    case 403:
      Modal.info({
        title: '提示',
        content: '权限状态已更新，请刷新后重试',
        okText: '手动刷新',
        onOk () {
          location.reload()
        }
      })
      // notification.error({
      //   message: 'Forbidden',
      //   description: data.message
      // })
      break
    case 401:
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        const { userStore } = useStore()
        userStore.handleLogout().then(() => {
          setTimeout(() => {
            router.replace('/login')
          }, 1500)
        })
      }
      break
    default:
      notification.error({
        message: '接口请求错误',
        description: `状态码${statusCode || error.toString()}`
      })
  }
  return Promise.reject(error)
}

export default request
