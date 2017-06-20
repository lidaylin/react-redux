import { DatePicker, Form, Button, Row, Col } from 'antd';
import React, { PropTypes } from 'react';
import moment from 'moment';
import { systemConstants } from 'src/utils/constants';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;

export default function Subdate({form, dateType='day', props, label}) {
  const { getFieldDecorator, getFieldValue, setFields, validateFields } = form;

  function checkRule(rule, value ,callback) {
    const endDate = getFieldValue('endDate');
    const beginDate = getFieldValue('beginDate');

    if (!beginDate || !endDate) {
      callback('请选择日期');
    }
    else if (dateType === 'day' && (endDate.isBefore(beginDate) && !endDate.isSame(beginDate, 'day'))) {
      callback('结束日期必须晚于开始日期');
    }
    else if (dateType === 'month' && (endDate.isBefore(beginDate, 'month') && !endDate.isSame(beginDate, 'month'))) {
      callback('结束日期必须晚于开始日期');
    }
    else if (
      dateType === 'day'
      && beginDate.isBefore(moment(endDate).subtract(systemConstants.searchDayRange - 1, 'day'))) {
      callback('日期范围不得超过' + systemConstants.searchDayRange + '天');
    }
    else if (
      dateType === 'month'
      && beginDate.isBefore(moment(endDate).subtract(systemConstants.searchMonthRange - 1, 'month'))) {
      callback('日期范围不得超过12个月');
    }
    else {
      callback();
    }
  }

  return (
      <FormItem>
        <FormItem>
          <div className="label">{ label || '日期：' }</div>
          {getFieldDecorator('beginDate', {
            // rules: [
            //   {
            //     required: true,
            //     message: '请选择日期',
            //   },
            // ],
            initialValue: moment(props.beginDate),
          })(dateType === 'month' ? (<MonthPicker/>) : (<DatePicker/>))}
        </FormItem>
        <FormItem>
          <span> - </span>
          {getFieldDecorator('endDate', {
            rules: [
              {
                validator: checkRule
              },
            ],
            initialValue: moment(props.endDate),
            validateTrigger: 'onSubmit',
            validateFirst: true,
          })(dateType === 'month' ? (<MonthPicker />) : (<DatePicker/>))}
        </FormItem>
      </FormItem>
  );
}