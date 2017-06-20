import { connect } from 'dva';
import React, { PropTypes } from 'react';
import Score from 'components/views/score';

function Income({ dispatch, income }) {
  return (
    <Score config={ income } dispatch={ dispatch } />
  );
}

export default connect(({ income }) => ({ income }))(Income);
