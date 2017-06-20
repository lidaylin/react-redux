import { Select, Form, Button } from 'antd';
import React, { PropTypes } from 'react';
import moment from 'moment';
import SubDate from 'components/common/subDate';
import _ from 'underscore';
import FormHandle from 'components/decorator/formHandle';
import { expendType, expendPayType } from 'src/models/money/expend/constants';
import { selectOptions } from 'src/utils/transform';
const Option = Select.Option;
const FormItem = Form.Item;
// @FormHandle
class SearchForm extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.props.handleSubmit} >
        <FormItem
          label="支出类型"
        >
          {
              getFieldDecorator('expendType', {
                initialValue: this.props.expendType,
              })(
                <Select className="search-form-select">
                  <Option key="-1" value="-1">所有</Option>
                  { selectOptions(expendType) }
                </Select>,
              )
            }
        </FormItem>
        <FormItem
          label="支出方式"
        >
          {
              getFieldDecorator('expendPayType', {
                initialValue: this.props.expendPayType,
              })(
                <Select className="search-form-select">
                  <Option key="-1" value="-1">所有</Option>
                  { selectOptions(expendPayType) }
                </Select>,
              )
            }
        </FormItem>
        <div className="form-br" />
        <SubDate form={this.props.form} props={this.props} label={"申请日期："}/>
        <div className="form-br" />
        <FormItem>
          <Button type="primary" size={'default'} htmlType="submit" style={{ marginRight: '12px' }}>查询</Button>
          <Button className={this.props.hasDownload} type="primary" size={'default'} onClick={this.props.handleDownload}>下载</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(FormHandle(SearchForm));
