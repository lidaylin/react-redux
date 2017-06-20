import { connect } from 'dva';
import React, { PropTypes } from 'react';
import { DatePicker, Button, Modal, Table, InputNumber, Input, Form, Select } from 'antd';
import { selectOptions, fieldsToParams, createPageConfig } from 'src/utils/transform';
import { incomeType, incomeStatus } from 'src/models/money/income/constants';
import FormModal from 'src/components/antd/formModal';
import IncomeForm from './incomeForm';


const Option = Select.Option;
const FormItem = Form.Item;
function IncomeConfirm({ dispatch, incomeModal, form: { getFieldsValue,
    getFieldDecorator, validateFieldsAndScroll, },
}) {

  let entryModal = null;
  const { type, searchParams } = incomeModal;

  function query(params) {
    dispatch({
      type: `${type}/query`,
      payload: {
        params,
        url: '/api/income/confirm',
      },
    });
  }

  function onSearch() {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        query({
          ...searchParams,
          ...fieldsToParams(values),
          pageNo: 1,
        });
      }
    });
  }

  const paginationInfo = createPageConfig(incomeModal, query);

  const entryProps = {
    cancel() {
      dispatch({
        type: `${type}/entryDialog`,
        visible: false,
      });
    },
    submit(fieldsValue) {
      const params = incomeModal.searchParams;
      // 支出金额单位是分
      fieldsValue.incomeAmount = parseInt(fieldsValue.incomeAmount * 100, 10);
      const postParams = fieldsToParams(fieldsValue);
      dispatch({
        type: `${type}/entryIncome`,
        payload: {
          searchParams: params,
          postParams,
        },
      });
    },
    visible: incomeModal.entryModalShow,
    custForm: IncomeForm,
    width: 380,
    height: 400,
    title: '收入录入',
  };

  function entryOpt() {
    dispatch({
      type: `${type}/entryDialog`,
      visible: true,
    });
    entryModal.resetFields();
  }
  return (
    <div>
      <div className="query-form">
        <Form layout="inline">
          <FormItem>
            <label>收入类型：</label>
            {
              getFieldDecorator(
                'incomeType',
                { initialValue: searchParams.incomeType },
              )(
                <Select className="search-form-select">
                  <Option key="-1" value="-1">所有</Option>
                  { selectOptions(incomeType) }
                </Select>,
              )
            }
          </FormItem>
          <FormItem>
            <label>收入状态：</label>
            {
              getFieldDecorator(
                'incomeStatus',
                { initialValue: searchParams.incomeStatus },
              )(
                <Select className="search-form-select">
                  <Option key="-1" value="-1">所有</Option>
                  { selectOptions(incomeStatus) }
                </Select>,
              )
            }
          </FormItem>
          <div className="form-br" />
          <FormItem>
            <Button type="primary" onClick={onSearch}>查询</Button>
          </FormItem>
        </Form>
      </div>
      <div className="query-result" style={{ top: '116px' }}>
        <Table size="middle" columns={incomeModal.columns} dataSource={incomeModal.list} pagination={paginationInfo} />
      </div>
      <div className="query-result-toolbar">
        <Button type="primary" onClick={entryOpt}>收入录入</Button>
      </div>
      <FormModal ref={(ref) => { entryModal = ref; }} config={entryProps} fieldErrors={ incomeModal.fieldErrors }/>
    </div>
  );
}

IncomeConfirm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  incomeModal: PropTypes.object.isRequired,
};

export default connect(({ incomeModal }) => ({ incomeModal }))(Form.create()(IncomeConfirm));
