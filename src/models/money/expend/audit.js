import { reducers, state, effects } from './model';
import { entryExpand } from 'src/services/money/expend';
import { message } from 'antd';
import { list } from 'src/services/money/expend';
import { dataHandle } from 'src/models/formBase';

const type = 'audit';
export default {
  namespace: type,
  state: {
    ...state,
    searchParams: {
      ...state.searchParams,
      expendType: '-1',
      expendPayType: '-1',
      queryType: '0',
    },
    type,
    batchUrl: `/api/expend/${type}`,
    rejectModalShow: false,
    entryDialogShow: false,
  },
  effects: {
    ...effects,
    * query({ payload }, { call, put, select }) {
      const params = yield select(state => state[type]['searchParams']);
      const { data, error } = yield call(list, params, '/api/expend');
      yield dataHandle.listHandle({ data, error }, { put });
    },

    * entryExpand({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data, error } = yield call(entryExpand, payload.postParams);
      if (!error) {
        yield put({ type: 'query', params: payload.searchParams });
        yield put({
          type: 'entrySuccess',
          payload: data,
        });
      } else if (error && error.fieldErrors) {
        yield put({
          type: 'putError',
          payload: error.fieldErrors,
        });
      }
    },
  },

  reducers: {
    ...reducers,
    entryDialog(state, action) {
      return {
        ...state,
        entryDialogShow: action.visible,
      };
    },
    entrySuccess(state) {
      message.success('操作成功！');
      return {
        ...state,
        entryDialogShow: false,
      };
    },
  },
};
