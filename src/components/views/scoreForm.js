import { DatePicker, Form, Button, Row, Col } from 'antd';
import React, { PropTypes } from 'react';
import moment from 'moment';
import SubDate from 'components/common/subDate';
import _ from 'underscore';
import FormHandle from 'components/decorator/formHandle';

const FormItem = Form.Item;

// @FormHandle
class scoreForm extends React.Component {

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const dateType = this.props.dateType;
    let label = '';
    switch (this.props.type) {
      case 'publish':
        label = '发放日期：';
        break;
      case 'recharge':
        label = '充值日期：';
        break;
      case 'use':
        label = '使用日期：';
        break;
      case 'withdraw':
        label = '提现日期：';
        break;
      case 'income':
        label = '报表月份：';
        break;
      case 'cost':
        label = '报表月份：';
        break;
      case 'manpan':
        label = '收入日期：';
        break;
      case 'wechat':
        label = '收入日期：';
        break;
      default:
        label = '';
        break;
    }
    
    return (
      <Form layout="inline" onSubmit={this.props.handleSubmit} >
        <SubDate form={this.props.form} dateType={dateType} props={this.props} label={label}/>
        <div className="form-br" />
        <FormItem>
          <Button type="primary" size={'default'} htmlType="submit" style={{ marginRight: '12px' }}>查询</Button>
          <Button type="primary" size={'default'} onClick={this.props.handleDownload}>下载</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(FormHandle(scoreForm));
