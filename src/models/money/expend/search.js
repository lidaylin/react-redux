import { state, effects, reducers } from './model';
import { list } from 'src/services/money/expend';
import { dataHandle } from 'src/models/formBase';

const type = 'searchModel';
export default {
  namespace: type,
  state: {
    ...state,
    searchParams: {
      ...state.searchParams,
      queryType: '2',
    },
    type,
    hasDownload: true,
  },
  effects: {
    ...effects,
    * query({ payload }, { call, put, select }) {
      const params = yield select(state => state[type]['searchParams']);
      const { data, error } = yield call(list, params, '/api/expend');
      yield dataHandle.listHandle({ data, error }, { put });
    },
  },
  reducers,
};
