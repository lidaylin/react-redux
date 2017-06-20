import { connect } from 'dva';
import React, { PropTypes } from 'react';
import View from './comp/view';

function SearchView({ dispatch, searchModel }) {
  return (
    <View dispatch={dispatch} expendModel={searchModel} />
  );
}

SearchView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchModel: PropTypes.object.isRequired,
};


export default connect(({ searchModel }) => ({ searchModel }))(SearchView);
