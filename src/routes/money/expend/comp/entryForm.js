import React from 'react';
import { Input, Form, Select, InputNumber, DatePicker } from 'antd';
import { expendPostType, expendPayType } from 'src/models/money/expend/constants';
import { selectOptions } from 'src/utils/transform';
import FormHandle from 'components/decorator/formHandle';

const FormItem = Form.Item;
class MyForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="支出类型"
        >
          {getFieldDecorator('expendType', {
            initialValue: '2',
          })(
            <Select className="submit-form-select" >
              { selectOptions(expendPostType) }
            </Select>,
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="支出金额："
        >
          {getFieldDecorator('expendAmount', {
            rules: [{ required: true, message: '请输入支出金额' }],
          })(
            <InputNumber style={{ width: '160px' }} formatter={value => `￥ ${value}`} />,
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="支出日期："
        >
          {getFieldDecorator('expendPayTime', {
            rules: [{ required: true, message: '请输入支出日期' }],
          })(
            <DatePicker />,
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="收款人："
        >
          {getFieldDecorator('expendIncomeUserName', {
            rules: [{ required: true, message: '请输入收款人' }],
          })(
            <Input />,
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="支出方式："
        >
          {getFieldDecorator('expendPayType', {
            initialValue: '0',
          })(
            <Select className="submit-form-select">
              { selectOptions(expendPayType) }
            </Select>,
            )
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(FormHandle(MyForm));
