import { connect } from 'dva';
import React, { PropTypes } from 'react';
import List from 'components/common/list';
import ScoreForm from './scoreForm';
import { transform, tools } from 'src/utils';

export default function Score({ dispatch, config, form }) {
  
  const { searchParams, type, dateType, isHidden, fieldErrors } = config;

  function getList() {
    dispatch({ type: `${type}/list` });
  }

  function downLoad(fields) {
    const params = transform.fieldsToParams(fields, dateType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD');
    const url = config.downloadUrl ? config.downloadUrl : `/api/score/${type}/download`;
    tools.download(url + transform.objectToHashString({ ...params}));
  }

  function paramsChange(params) {
    dispatch({
      type: `${type}/paramsChange`,
      payload: params,
    });
  }

  function listChange(params) {
    paramsChange(params);
    getList();
  }

  function handleFormFields(fields) {
    const params = transform.fieldsToParams(fields, dateType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD');
    paramsChange({
      ...params,
      pageNo: 1,
    });
  }

  function onSubmit(fields) {
    handleFormFields(fields);
    getList();
  }

  const listClass = isHidden ? 'list-container hide' : 'list-container';
  return (
    <div className={listClass}>
      <div className="query-form">
        <ScoreForm
          {...searchParams}
          download={downLoad}
          onSubmit={onSubmit}
          dateType={dateType}
          fieldErrors={fieldErrors}
          type={type}
        />
      </div>
      <div className="query-result clearfix">
        <List
          columns={config.columns}
          dataSource={config.list}
          pagination={{ ...searchParams, current: searchParams.pageNo, total: config.total }}
          onChange={listChange}
          expandedRowRender={config.expandedRowRender}
          bordered={config.bordered}
        />
      </div>
    </div>
  );
}

Score.propTypes = {
  dispatch: PropTypes.func,
  config: PropTypes.object,
};
