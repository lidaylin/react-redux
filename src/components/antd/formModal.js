import React, { PropTypes } from 'react';
import { Modal, Button } from 'antd';

class FormModal extends React.Component {

  constructor(props) {
    super(props);
    this.custForm = null;
  }

  cancel = () => {
    this.props.config.cancel();
  }

  resetFields = () => {
    if (this.custForm) {
      this.custForm.resetFields();
    }
  }

  handleSubmit = () => {
    this.custForm.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.props.config.submit(fieldsValue);
    });
  }

  render() {
    const CustForm = this.props.config.custForm;
    const title = this.props.config.title || '';
    return (
      <Modal
        visible={this.props.config.visible}
        title={title} onCancel={this.cancel}
        footer={false}
        wrapClassName="vertical-center-modal form-modal"
        width={this.props.config.width}
        height={this.props.config.height}
        maskClosable={false}
      >
        <CustForm ref={(ref) => { this.custForm = ref; }} config={{ ...this.props.config }} fieldErrors={this.props.fieldErrors} />
        <div className="modal-bottom-bar clearfix">
          <div className="btn-wrap cancel-btn">
            <Button onClick={this.cancel} >取消</Button>
          </div>
          <div className="btn-wrap">
            <Button onClick={this.handleSubmit} >提交</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

FormModal.propTypes = {
  config: PropTypes.object.isRequired,
};

export default FormModal;
