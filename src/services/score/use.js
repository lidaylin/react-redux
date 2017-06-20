import { request } from '../../utils';

export async function getUseList(data) {
  return request('/api/score/use', {
    method: 'get',
    data
  });
}

export async function downLoadUse(data) {
  return request('/api/score/use/download', {
    method: 'get',
    data
  });
}
