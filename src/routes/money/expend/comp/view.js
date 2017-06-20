import { connect } from 'dva';
import React, { PropTypes } from 'react';
import { Button, Table, message } from 'antd';
import { createPageConfig, fieldsToParams } from 'src/utils/transform';
import FormModal from 'src/components/antd/formModal';
import rejectForm from './rejectForm';
import entryForm from './entryForm';
import moment from 'moment';
import { transform, tools } from 'src/utils';
import { columns, searchColumns } from './columns';
import SearchForm from './searchForm';

export default function View({ dispatch, expendModel }) {
  let rejectModal = null;
  let entryModal = null;
  const { searchParams, type, fieldErrors } = expendModel;

  function query(params) {
    dispatch({
      type: `${type}/paramsChange`,
      payload: params,
    });

    dispatch({ type: `${type}/query` });
  }

  function submit(fields) {
    const params = fieldsToParams(fields);
    query({
      ...expendModel.searchParams,
      ...params,
      pageNo: 1,
    });
  }

  function downLoad(fields) {
    const params = fieldsToParams(fields);
    dispatch({
      type: `${type}/paramsChange`,
      payload: params,
    });
    const url = '/api/expend/download';
    tools.download(url + transform.objectToHashString({ ...params }));
  }

  const paginationInfo = createPageConfig(expendModel, query);

  function batchOperate(callback) {
    if (expendModel.confirmIds.length === 0) {
      message.info('未选择！');
    } else {
      callback();
    }
  }

  function confirmOpt() {
    batchOperate(() => {
      const params = expendModel.searchParams;
      dispatch({
        type: `${type}/batchOperate`,
        payload: {
          ids: expendModel.confirmIds,
          searchParams: params,
          type: 1,
          url: expendModel.batchUrl,
        },
      });
    });
  }

  function rejectOpt() {
    batchOperate(() => {
      dispatch({
        type: `${type}/rejectDialog`,
        visible: true,
      });
      rejectModal.resetFields();
    });
  }

  const rejectProps = {
    cancel() {
      dispatch({
        type: `${type}/rejectDialog`,
        visible: false,
      });
    },
    submit(fieldsValue) {
      const params = expendModel.searchParams;
      dispatch({
        type: `${type}/batchOperate`,
        payload: {
          ids: expendModel.confirmIds,
          searchParams: params,
          type: 2,
          reason: fieldsValue.content,
          url: expendModel.batchUrl,
        },
      });
    },
    visible: expendModel.rejectModalShow,
    custForm: rejectForm,
    width: 400,
    height: 265,
    title: '驳回',
  };

  const entryProps = {
    cancel() {
      dispatch({
        type: `${type}/entryDialog`,
        visible: false,
      });
    },
    submit(fieldsValue) {
      const params = expendModel.searchParams;
      // 支出金额单位是分
      fieldsValue.expendAmount = parseInt(fieldsValue.expendAmount * 100, 10);
      const postParams = fieldsToParams(fieldsValue);
      dispatch({
        type: `${type}/entryExpand`,
        payload: {
          searchParams: params,
          postParams,
        },
      });
    },
    visible: expendModel.entryDialogShow,
    custForm: entryForm,
    width: 400,
    height: 402,
    title: '支出录入',
  };

  function entryOpt() {
    dispatch({
      type: `${type}/entryDialog`,
      visible: true,
    });
    entryModal.resetFields();
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const ids = [];
      selectedRows.forEach((item) => {
        ids.push(item.id);
      });
      dispatch({
        type: `${type}/rowsChange`,
        ids,
      });
    },
  };

  let btn = '';
  if (type === 'audit') {
    btn = (
      <Button type="primary" onClick={entryOpt}>录入支出</Button>
    );
  }

  let buttomToolBar = (
    <div className="query-result-toolbar">
      <Button type="primary" onClick={confirmOpt} >确认</Button>
      <Button type="primary" onClick={rejectOpt} >拒绝</Button>
      { btn }
    </div>
  );

  let table = (
    <Table size="middle" rowSelection={rowSelection} columns={columns} dataSource={expendModel.list} pagination={paginationInfo} />
  );

  if (type === 'searchModel') {
    buttomToolBar = '';
    table = (
      <Table size="middle" columns={searchColumns} dataSource={expendModel.list} pagination={paginationInfo} />
    );
  }

  return (
    <div>
      <div className="query-form">
        <SearchForm
          {...searchParams}
          download={downLoad}
          onSubmit={submit}
          fieldErrors={fieldErrors}
          hasDownload={expendModel.hasDownload ? '' : 'hide'}
        />
      </div>
      <div className="query-result">
        { table }
      </div>
      { buttomToolBar }
      <FormModal
        ref={(ref) => { rejectModal = ref; }}
        config={rejectProps}
        fieldErrors={expendModel.fieldErrors}
      />
      <FormModal
        ref={(ref) => { entryModal = ref; }}
        config={entryProps}
        fieldErrors={expendModel.fieldErrors}
      />
    </div>
  );
}

View.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expendModel: PropTypes.object.isRequired,
};
