import { connect } from 'dva';
import React, { PropTypes } from 'react';
import { DatePicker, Button, Table, Form, Select } from 'antd';
import { selectOptions, fieldsToParams, createPageConfig } from 'src/utils/transform';
import moment from 'moment';
import { incomeType, incomePayType } from 'src/models/money/income/constants';
import SubDate from 'components/common/subDate';
import { transform, tools } from 'src/utils';
import FormHandle from 'components/decorator/formHandle';

const Option  = Select.Option;

function IncomeSearch({
  dispatch,
  incomeSearchModel,
  form,
}) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;
  const FormItem = Form.Item;
  const { type, searchParams, putParams } = incomeSearchModel;
  const pageInfo = createPageConfig(incomeSearchModel, query);

  function query(params) {
    dispatch({
      type: `${type}/query`,
      payload: {
        params,
        url: '/api/income/',
      },
    });
  }

  function download() {
    validateFieldsAndScroll(
      { force: true },
      (errors, values) => {
        if (!errors) {
          const params = fieldsToParams(values);
          const url = '/api/income/download';
          tools.download(url + transform.objectToHashString({ ...params }));
        }
      });
  }

  function onSearch() {
    validateFieldsAndScroll(
      { force: true },
      (errors, values) => {
        if (!errors) {
          query({
            ...searchParams,
            ...fieldsToParams(values),
            pageNo: 1,
          });
        }
      },
    );
  }

  return (
    <div className="query-form">
      <Form layout="inline">
        <FormItem>
          <label>收入类型：</label>
          {getFieldDecorator('incomeType', {
            initialValue: incomeSearchModel.searchParams.incomeType,
          })(
            <Select size="large" style={{ width: 160 }}>
              <Option key="-1" value="-1">所有</Option>
              { selectOptions(incomeType) }
            </Select>)}
        </FormItem>
        <FormItem>
          <label>付款方式：</label>
          {getFieldDecorator('incomePayType', {
            initialValue: incomeSearchModel.searchParams.incomePayType,
          })(
            <Select size="large" style={{ width: 160 }}>
              <Option key="-1" value="-1">所有</Option>
              {selectOptions(incomePayType)}
            </Select>)}
        </FormItem>
        <div className="form-br" />
        <SubDate form={form} dateType="day" props={searchParams} label={"收入日期："}/>
        <div className="form-br" />
        <FormItem>
          <Button type="primary" size="default" style={{ marginRight: '12px' }} onClick={onSearch}>查询</Button>
          <Button type="primary" size="default" onClick={download}>下载</Button>
        </FormItem>
      </Form>
      <div className="form-br" />
      <div className="query-result" style={{ top: '116px' }}>
        <Table size="middle" columns={incomeSearchModel.columns} dataSource={incomeSearchModel.list} pagination={pageInfo} />
      </div>
    </div>
  );
}

IncomeSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  incomeSearchModel: PropTypes.object.isRequired,
};

export default connect(({ incomeSearchModel }) => ({ incomeSearchModel }))(Form.create()(IncomeSearch));
