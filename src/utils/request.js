const Ajax = require('axios');
import { message } from 'antd';
import _ from 'underscore';

const delayCloseTime = 5;

const info = function (error, text) {
  message.error(
    error && error.response && error.response.data && error.response.data.message || '服务器错误',
    delayCloseTime,
  );
};

const httpStatus = {
  409: error => {
    if (error && error.response && error.response.data) {
      const data = error.response.data;
      if (data.message) {
        info(error, data.message);
      }
      else if (data.fieldErrors && !_.isEmpty(data.fieldErrors)) {
        return data;
      }
      else {
        info(error, '服务器错误');
      }
    }
    else {
      info(error, '服务器错误');
    }
  },
  500: error => info(error, '服务器错误'),
  403: error => info(error, '权限错误'),
  401: error => {
    window.location.href = error.response.data;
  },
};

export default function request(url, options) {
  if ((options.method === 'get' || options.method === 'put' || !options.method) && options.data) {
    options.params = options.data;
    options.data = null;
  }

  return Ajax({
    method: options.method || 'get',
    url,
    data: options.data || {},
    params: options.params || {},
  }).then(response => ({ data: response.data || '' }))
    .catch((error) => {
      const code = error && error.response && error.response.status;
      let err;
      if (code && httpStatus[code]) {
        err = httpStatus[error.response.status](error);
      }
      else {
        info(error, '服务器错误');
      }
      return err ? {error: err} : {error};
    });
};
