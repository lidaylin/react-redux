import React from 'react';
import { Input, Form } from 'antd';
import FormHandle from 'components/decorator/formHandle';

const FormItem = Form.Item;
class MyForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="">
        <FormItem>
          {getFieldDecorator('content', {
            rules:
            [
              { required: true, message: '需要录入驳回原因' },
              { max: 100, message: '不能超过100个字符' },
            ],
          })(
            <Input type="textarea" placeholder="驳回原因" autosize={{ minRows: 3, maxRows: 6 }} onChange={this.handleChange} />,
          )}
        </FormItem>
      </Form>
    );
  }
}
const reasonForm = Form.create()(FormHandle(MyForm));
export default reasonForm;
