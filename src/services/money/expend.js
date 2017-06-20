import { request } from 'src/utils';

export async function list(params, url) {
  return request(url, {
    method: 'get',
    params,
  });
}

export async function putConfirm(params, url) {
  return request(url, {
    method: 'put',
    params,
  });
}

export async function batchConfirm(params, url) {
  return request(url, {
    method: 'put',
    params,
  });
}

export async function entryExpand(params) {
  return request('/api/expend', {
    method: 'post',
    params,
  });
}

export async function detail(params, url) {
  return request(url, {
    method: 'get',
    params,
  });
}

