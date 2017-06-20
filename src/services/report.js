import { request } from 'src/utils';

export async function getIncomeReportList(params) {
  return request('/api/report/score/income', {
    method: 'get',
    params
  });
}

export function downLoadIncomeReport(params) {
  return '/api/report/score/income/download';
}

export async function getCostReportList(params) {
  return request('/api/report/score/cost', {
    method: 'get',
    params
  });
}

export function downLoadCostReport(params) {
  return '/api/report/score/cost/download';
}

export function downLoadAccountManpan(params) {
  return '/api/report/account/manpan/download';
}

export async function getAccountManpanList(params) {
  return request('/api/report/account/manpan', {
    method: 'get',
    params
  });
}

export async function getAccountWeixinList(params) {
  return request('/api/report/account/wechat', {
    method: 'get',
    params
  });
}

export function downLoadAccountWeixin(params) {
  return '/api/report/account/wechat/download';
}


