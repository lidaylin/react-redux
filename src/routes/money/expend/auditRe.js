import { connect } from 'dva';
import React, { PropTypes } from 'react';
import View from './comp/view';

function AuditReview({ dispatch, reaudit }) {
  return (
    <View dispatch={dispatch} expendModel={reaudit} />
  );
}

AuditReview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  reaudit: PropTypes.object.isRequired,
};

export default connect(({ reaudit }) => ({ reaudit }))(AuditReview);
