import { connect } from 'dva';
import React, { PropTypes } from 'react';
import Score from 'components/views/score';
import { Form } from 'antd';

function Recharge({ dispatch, recharge, form }) {
  return (
    <Score config={recharge} dispatch={dispatch} form={ form } />
  );
}

export default connect(({ recharge, form }) => ({ recharge, form }))(Recharge);
