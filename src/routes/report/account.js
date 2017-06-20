import { connect } from 'dva';
import React, { PropTypes } from 'react';
import Score from 'components/views/score';
import { label, Select } from 'antd';

function Account({ dispatch, wechat, manpan }) {

  const Option = Select.Option;

  const itemToggle = {
    wechat: 'manpan',
    manpan: 'wechat',
  };

  function handleChange(value) {
    dispatch({
      type: `${value}/showItem`,
      payload: value
    });

    dispatch({
      type: `${itemToggle[value]}/hideItem`
    });
  }

  return (
    <div className="query-form">
    <div className="form-line clearfix">
      <label className="form-label" >账户类型：</label>
      <Select size="default" defaultValue="wechat" style={{ width: 120 }} onChange={handleChange}>
        <Option key="wechat" value="wechat">微信账户</Option>
        <Option key="manpan" value="manpan">满盘享账户</Option>
      </Select>
    </div>
    <Score config={ wechat } dispatch={ dispatch } />
    <Score config={ manpan } dispatch={ dispatch } />
    </div>
  );
}

export default connect(({ wechat, manpan }) => ({ wechat, manpan }))(Account);
