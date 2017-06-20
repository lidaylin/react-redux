import { request } from '../utils';

export async function logout(params) {
  return request('/api/user/logout', {
    method: 'get',
    data: params,
  });
}

export async function userInfo(params) {
  return request('/api/user/username', {
    method: 'get',
    data: params,
  });
}

export async function menu(params) {
  return request('/api/user/menu', {
    method: 'get'
  });
}