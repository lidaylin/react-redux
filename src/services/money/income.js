import { request } from 'src/utils';

export async function list(params, url) {
  return request(url, {
    method: 'get',
    params,
  });
}

export async function entering(params, url) {
  return request(url, {
    method: 'post',
    params,
  });
}
export function download(params, url) {
  return request(url, {
    method: 'get',
    params,
  });
}
