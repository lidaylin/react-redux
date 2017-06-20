import React, { PropTypes } from 'react';
import { Select, Form, Input, Button } from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;

export default {
  getDate(time, type = 'YYYY-MM-DD') {
    const date = moment(parseInt(time, 10));
    return date.isValid() ? date.format(type) : '';
  },

  objectToHashString(obj) {
    let str = '?';
    if (!obj) {
      return str;
    }
    for (const key in obj) {
      if (obj[key]) {
        str += `${key}=${obj[key]}&`;
      }
    }
    return str;
  },

  selectOptions(constantsType) {
    const options = [];
    const keys = Object.keys(constantsType);
    let index = 0;
    while (index < keys.length) {
      const key = keys[index];
      options.push(<Option key={key} value={key}>{ constantsType[key] }</Option>);
      index++;
    }
    return options;
  },

  fieldsToParams(fields, dateType='YYYY-MM-DD') {
    const params = {};
    const keys = Object.keys(fields);
    let i = keys.length - 1;

    while (i >= 0) {
      const key = keys[i];
      if (fields[key] instanceof moment) {
        params[key] = fields[key].format(dateType);
      } else {
        params[key] = fields[key];
      }
      i--;
    }

    return params;
  },

  createPageConfig(model, query) {
    return {
      pageSize: model.searchParams.pageSize,
      total: model.total,
      pageSizeOptions: ['10', '30', '50'],
      showSizeChanger: true,
      current: model.searchParams.pageNo,
      onChange(page, pageSize) {
        const params = {
          ...model.searchParams,
          pageNo: page,
          pageSize,
        };
        query(params);
      },
      onShowSizeChange(current, size) {
        const params = {
          ...model.searchParams,
          pageNo: 1,
          pageSize: size,
        };
        query(params);
      },
    };
  },
};
