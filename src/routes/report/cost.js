import { connect } from 'dva';
import React, { PropTypes } from 'react';
import Score from 'components/views/score';

function Cost({ dispatch, cost }) {
  return (
    <Score config={ cost } dispatch={ dispatch } />
  );
}

export default connect(({ cost }) => ({ cost }))(Cost);
