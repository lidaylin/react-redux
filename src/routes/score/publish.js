import { connect } from 'dva';
import React, { PropTypes } from 'react';
import Score from 'components/views/score';

function Publish({ dispatch, publish }) {
  return (
    <Score config={ publish } dispatch={ dispatch } />
  );
}

export default connect(({ publish }) => ({ publish }))(Publish);
