import { state, effects, reducers } from './model';
import { list } from 'src/services/money/expend';
import { dataHandle } from 'src/models/formBase';

const type = 'reaudit';
export default {
  namespace: type,
  state: {
    ...state,
    searchParams: {
      ...state.searchParams,
      queryType: '1',
    },
    type,
    batchUrl: `/api/expend/${type}`,
    rejectModalShow: false,
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
