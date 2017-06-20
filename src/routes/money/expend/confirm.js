import { connect } from 'dva';
import React, { PropTypes } from 'react';
import { DatePicker, Button, Table, Modal, InputNumber, Form, Select, Input } from 'antd';
import { selectOptions, fieldsToParams, createPageConfig } from 'src/utils/transform';
import { confirmType } from 'src/models/money/expend/constants';
import moment from 'moment';
import SubDate from 'components/common/subDate';
const Option = Select.Option;
import ConfirmForm from './comp/confirmForm';
import FormModal from 'src/components/antd/formModal';
import { transform } from 'src/utils';


const FormItem = Form.Item;

class FormConfig extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(
      { force: true }, // 每次强制检测所有的item，不然会是惰性
      (errors, values) => {
        if (!errors) {
          const fields = this.props.form.getFieldsValue();
          const params = fieldsToParams(fields);
          this.props.query({
            ...this.props.confirmModel.searchParams,
            ...params,
            pageNo: 1,
          });
        }
      },
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { searchParams } = this.props.confirmModel;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <FormItem>
          <label>确认状态：</label>
          {
            getFieldDecorator('confirmType', {
              initialValue: searchParams.confirmType,
            })(
              <Select className="search-form-select">
                { selectOptions(confirmType) }
              </Select>,
            )
          }
        </FormItem>
        <div className="form-br" />
        <SubDate form={this.props.form} dateType="day" props={searchParams} label={'申请日期：'} />
        <div className="form-br" />
        <FormItem>
          <Button type="primary" size={'default'} htmlType="submit" style={{ marginRight: '12px' }}>查询</Button>
        </FormItem>
      </Form>
    );
  }
}

class ExpandConfirm extends React.Component {

  constructor(props) {
    super(props);
    const { dispatch, confirmModel } = props;
    const { type } = confirmModel;

    this.state = {
      formProps: {
        cancel: () => this.props.dispatch({ type: 'confirmModel/hideForm' }),
        submit: (fieldsValue) => {
          this.putItem(fieldsValue);
        },
        custForm: ConfirmForm,
        width: 350,
        height: 214,
        title: '转出确认',
      },
      expendAmount: 0,
      confirmExpendDate: moment(),
      confirmId: 0,
    };

    this.columns = [{
      title: '序号',
      dataIndex: 'no',
      width: 30,
    }, {
      title: '申请日期',
      dataIndex: 'confirmDate',
      width: 70,
      render: value => transform.getDate(value),
    }, {
      title: '支出类型',
      dataIndex: 'expendType',
      width: 70,
    }, {
      title: '支出金额',
      dataIndex: 'expendAmount',
      width: 70,
      render: value => (value / 100).toFixed(2),
    }, {
      title: '支出日期',
      dataIndex: 'confirmExpendDate',
      width: 70,
      render: value => transform.getDate(value),
    }, {
      title: '确认状态',
      dataIndex: 'confirmType',
      width: 70,
    }, {
      title: '操作',
      width: 70,
      render: (text, record, index) => (
        <Button
          type="primary" onClick={
              (e) => {
                this.handle(text, record, index);
              }
            }
        >确认</Button>),
    },
    ];
  }

  handle(text, record, index) {
    this.props.dispatch({ type: 'confirmModel/showForm' }),
    this.setState({
      expendAmount: record.expendAmount,
      confirmExpendDate: record.confirmExpendDate || this.state.confirmExpendDate,
      confirmId: record.id,
    });
  }

  query(params) {
    this.props.dispatch({
      type: 'confirmModel/query',
      params,
    });
  }

  putItem(fieldsValue) {
    const params = {
      ...fieldsValue,
      confirmExpendDate: fieldsValue.confirmExpendDate.format('YYYY-MM-DD'),
      confirmId: this.state.confirmId,
    };
    this.props.dispatch({
      type: 'confirmModel/put',
      params,
    });
  }

  render() {
    const SearchForm = Form.create()(FormConfig);
    const paginationInfo = createPageConfig(this.props.confirmModel, this.query.bind(this));
    return (
      <div>
        <div className="query-form">
          <SearchForm confirmModel={this.props.confirmModel} query={this.query.bind(this)} />
        </div>
        <div className="query-result">
          <Table size="middle" columns={this.columns} dataSource={this.props.confirmModel.list} pagination={paginationInfo} />
        </div>
        <FormModal
          fieldErrors={this.props.fieldErrors} config={{ ...this.state.formProps,
            visible: this.props.confirmModel.visible,
            expendAmount: this.state.expendAmount,
            confirmExpendDate: this.state.confirmExpendDate }}
        />
      </div>
    );
  }
}


ExpandConfirm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  confirmModel: PropTypes.object.isRequired,
};

export default connect(({ confirmModel }) => ({ confirmModel }))(ExpandConfirm);

