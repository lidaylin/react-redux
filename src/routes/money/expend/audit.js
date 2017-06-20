import { connect } from 'dva';
import React, { PropTypes } from 'react';
import View from './comp/view';

function AuditHandle({ dispatch, audit }) {
  return (
    <View dispatch={dispatch} expendModel={audit} />
  );
}

AuditHandle.propTypes = {
  dispatch: PropTypes.func.isRequired,
  audit: PropTypes.object.isRequired,
};

export default connect(({ audit }) => ({ audit }))(AuditHandle);
