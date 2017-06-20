import React from 'react';
import { InputNumber, Form, DatePicker } from 'antd';

const FormItem = Form.Item;
class ConfirmForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const expendAmount = this.props.config.expendAmount;
    return (
      <Form onSubmit={this.handleSubmit} className="">
        <FormItem
          label="确认转出"
        >
          {getFieldDecorator('confirmExpendAmount', {
            rules:
            [
              { required: true, message: '需要录入金额' },
              {
                validator: function (rule, value ,callback) {
                  if (value < expendAmount) {
                    callback('修改金额不得小于待确认金额');
                  }
                  else {
                    callback();
                  }
                },
              },
            ],
            initialValue: expendAmount,
            validateTrigger: 'onSubmit',

          })(
            <InputNumber style={{ width: '160px' }} formatter={value => `￥ ${(value / 100).toFixed(2)}`} />,
          )}
        </FormItem>
        <FormItem
          label="转出日期"
        >
          {getFieldDecorator('confirmExpendDate', {
            rules: [{ required: true, message: '请输入支出日期' }],
            initialValue: this.props.config.confirmExpendDate,
          })(
            <DatePicker />,
            )
          }
        </FormItem>
      </Form>
    );
  }
}
const reasonForm = Form.create()(ConfirmForm);
export default reasonForm;
