import React from 'react';
import { Input, Form, Select, InputNumber, DatePicker } from 'antd';
import { constants } from 'src/models/money/expend/constants';
import { selectOptions } from 'src/utils/transform';
import { incomeType, incomePayType } from 'src/models/money/income/constants';
import moment from 'moment';
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
          label="收入类型"
        >
          {getFieldDecorator('incomeType', {
            initialValue: '0',
          })(
            <Select className="submit-form-select" >
              { selectOptions(incomeType) }
            </Select>,
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="收入金额"
        >
          {getFieldDecorator('incomeAmount', {
            rules: [
              { required: true, message: '请输入收入金额' },
              {
                validator: (rule, value, callback) => {
                  if (value > 0) {
                    callback();
                  } else {
                    callback('收入金额需大于0');
                  }
                },
              },
            ]
          })(
            <InputNumber style={{ width: '150px' }} formatter={value => `￥ ${value}`} />,
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="收入日期"
        >
          {getFieldDecorator('incomeDate', {
            rules: [{ required: true, message: '请输入收入日期' }],
          })(
            <DatePicker />,
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="付款人"
        >
          {getFieldDecorator('incomePayUserName', {
            rules: [{ required: true, message: '请输入付款人' }],
          })(
            <Input />,
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="付款方式"
        >
          {getFieldDecorator('incomePayType', {
            initialValue: '0',
          })(
            <Select className="submit-form-select">
              { selectOptions(incomePayType) }
            </Select>,
            )
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(FormHandle(MyForm));
