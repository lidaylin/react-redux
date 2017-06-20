import { request } from '../../utils';

export async function getPublishList(params) {
  return request('/api/score/publish', {
    method: 'get',
    params
  });
}
