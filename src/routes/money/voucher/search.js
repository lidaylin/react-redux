import { connect } from 'dva';
import React, { PropTypes } from 'react';
import { DatePicker, Button, Table, Modal, InputNumber, Form, Select, Input } from 'antd';
import { selectOptions, fieldsToParams, createPageConfig } from 'src/utils/transform';
import { voucherStatus } from 'src/models/money/voucher/constants';
import moment from 'moment';
import SubDate from 'components/common/subDate';
import { detailColumns } from './detailColumns';
import { transform, tools } from 'src/utils';
import FormHandle from 'components/decorator/formHandle';

const Option = Select.Option;

const FormItem = Form.Item;

function VoucherSearch({ dispatch, voucherSearch }) {
  const { type } = voucherSearch;
  function query(params) {
    dispatch({
      type: `${type}/query`,
      params,
    });
  }
  const paginationInfo = createPageConfig(voucherSearch, query);

  function showDetial(e) {
    const detailId = e.currentTarget.id.split('_')[1];
    dispatch({
      type: `${type}/showDetail`,
      detailId,
    });
  }

  function returnList() {
    dispatch({
      type: `${type}/returnList`,
    });
  }
  const columns = [{
    title: '序号',
    dataIndex: 'orderNo',
    width: 50,
  }, {
    title: '凭证编号',
    dataIndex: 'no',
    width: 120,
  }, {
    title: '公司段',
    dataIndex: 'companySection',
    width: 100,
  }, {
    title: '产品段',
    dataIndex: 'productSegment',
    width: 100,
  }, {
    title: '科目段',
    dataIndex: 'subjectSection',
    width: 100,
  }, {
    title: '成本中心',
    dataIndex: 'costCenterSection',
    width: 100,
  }, {
    title: '凭证描述',
    dataIndex: 'voucherDesc',
  }, {
    title: '凭证行描述',
    dataIndex: '',
  }, {
    title: '详情',
    width: 70,
    key: 'action',
    width: 70,
    render: (text, record) => (
      <span><a href="javascript:;" onClick={showDetial} id={`detailId_${record.no}`}>详情</a></span>
    ),
  }];

  class FormConfig extends React.Component {

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields(
        { force: true }, // 每次强制检测所有的item，不然会是惰性
        (errors, values) => {
          if (!errors) {
            const fields = this.props.form.getFieldsValue();
            const params = fieldsToParams(fields);
            query({
              ...voucherSearch.searchParams,
              ...params,
              pageNo: 1,
            });
          }
        },
      );
    }

    handleDownload = (e) => {
      e.preventDefault();
      this.props.form.validateFields(
        { force: true },
        (errors, values) => {
          if (!errors) {
            const params = fieldsToParams(values);
            const url = '/api/voucher/download';
            tools.download(url + transform.objectToHashString({ ...params }));
          }
        });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { searchParams } = voucherSearch;
      return (
        <Form onSubmit={this.handleSubmit} layout="inline">
          <FormItem
            label="凭证编号"
          >
            {
              getFieldDecorator('no', {
                initialValue: searchParams.no,
              })(
                <Input placeholder="" />,
              )
            }
          </FormItem>
          <FormItem
            label="制证状态"
          >
            {
              getFieldDecorator('voucherStatus', {
                initialValue: searchParams.voucherStatus,
              })(
                <Select style={{ width: '150px' }}>
                  <Option key="-1" value="-1">全部</Option>
                  { selectOptions(voucherStatus) }
                </Select>,
              )
            }
          </FormItem>
          <div className="form-br" />
          <SubDate form={this.props.form} dateType="day" props={searchParams} label={'凭证区间：'} />
          <FormItem
            label="凭证描述"
          >
            {
              getFieldDecorator('voucherDesc', {
                initialValue: searchParams.voucherDesc,
              })(
                <Input placeholder="" />,
              )
            }
          </FormItem>
          <div className="form-br" />
          <FormItem>
            <div style={{ display: voucherSearch.listDisplay }}>
              <Button type="primary" size={'default'} htmlType="submit" style={{ marginRight: '12px' }}>查询</Button>
              <Button type="primary" size={'default'} onClick={this.handleDownload}>下载</Button>
            </div>
            <Button type="primary" size={'default'} style={{ display: voucherSearch.detailDisplay }} onClick={returnList}>返回列表</Button>
          </FormItem>
        </Form>
      );
    }
  }
  const SearchForm = Form.create()(FormHandle(FormConfig));

  return (
    <div>
      <div className="query-form">
        <SearchForm fieldErrors={voucherSearch.fieldErrors}/>
      </div>
      <div className="query-result">
        <div style={{ display: voucherSearch.listDisplay }}>
          <Table size="middle" columns={columns} dataSource={voucherSearch.list} pagination={paginationInfo} />
        </div>
        <div style={{ display: voucherSearch.detailDisplay, width: '100%' }} >
          <Table size="middle" columns={detailColumns} dataSource={voucherSearch.detailList} scroll={{ x: 3000 }} pagination={false} />
        </div>
      </div>
    </div>
  );
}

VoucherSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  voucherSearch: PropTypes.object.isRequired,
};

export default connect(({ voucherSearch }) => ({ voucherSearch }))(VoucherSearch);

