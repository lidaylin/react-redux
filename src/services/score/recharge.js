import { request } from '../../utils';

export async function getRechargeList(params) {
  return request('/api/score/recharge', {
    method: 'get',
    params
  });
}

export async function downLoadRecharge(params) {
  return request('/api/score/recharge/download', {
    method: 'get',
    params
  });
}
