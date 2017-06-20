import { request } from '../../utils';

export async function getWithdrawList(params) {
  return request('/api/score/withdraw', {
    method: 'get',
    params
  });
}

export async function downLoadWithdraw(params) {
  return request('/api/score/withdraw/download', {
    method: 'get',
    params
  });
}
