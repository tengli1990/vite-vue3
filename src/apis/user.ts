import { LoginParameters } from '../types/login';
import request from '../utils/request';

export function login (data: LoginParameters): Promise<any> {
  return request({
    url: '/account/login',
    data,
    method: 'POST'
  });
}

export function logout (): Promise<any> {
  return new Promise((resolve) => {
    resolve({
      code: '0000',
      msg: '成功',
      data: null
    });
  });
}

export function getUserInfo (): Promise<any> {
  return request({
    url: '/account/detail',
    method: 'POST'
  });
}
