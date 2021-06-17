import { RouteRecordRaw } from 'vue-router'

// 扩展属性
export declare type CustomRouteRecordRaw = RouteRecordRaw & {
  permission?: any;
  hidden?: boolean;
  fullPath?: string;
  index?: any;
}

// 重定向路由
export declare interface CustomRedirectRoute{
  permission: any | string;
  path: string;
  index: number;
}

// 面包屑
export declare interface BreadcrumbRoute {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
