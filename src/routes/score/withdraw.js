import { connect } from 'dva';
import React from 'react';
import Score from 'components/views/score';

function Withdraw({ dispatch, withdraw }) {
  return (
    <Score config={withdraw} dispatch={dispatch} />
  );
}

export default connect(({ withdraw }) => ({ withdraw }))(Withdraw);
