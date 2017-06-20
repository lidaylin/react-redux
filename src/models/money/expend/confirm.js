import { list, putConfirm } from 'src/services/money/expend';
import { effects, reducers } from './model';
import { keyToLabel } from 'src/utils/transform';
import moment from 'moment';
import { systemConstants } from 'src/utils/constants';
import { message } from 'antd';
import { dataHandle } from 'src/models/formBase';

const type = 'confirmModel';
export default {
  namespace: type,
  state: {
    list: [],
    searchParams: {
      beginDate: systemConstants.beginDay,
      endDate: systemConstants.endDay,
      confirmType: '0',
      pageSize: systemConstants.pageSize,
      pageNo: 1,
    },
    visible: false,
    inputExpandVisible: false,
    type,
    total: 0,
    getUrl: '/api/expend/confirm/',
  },

  effects: {
    ...effects,
    * query({ payload }, { call, put, select }) {
      const params = yield select(state => state[type]['searchParams']);
      const { data, error } = yield call(list, params, '/api/expend');
      yield dataHandle.listHandle({ data, error }, { put });
    },

    * put({ params }, { call, put }) {
      const { data, error } = yield call(putConfirm, params, '/api/expend/confirm');
      if (!error) {
        message.success('操作成功！');
        put({ type: 'hideForm'}),
        yield put({
          type: 'query',
        })
      }
    },
  },
  reducers: {
    ...reducers,
    showForm(state) {
      return {
        ...state,
        visible: true
      }
    },
    hideForm(state) {
      return {
        ...state,
        visible: false
      }
    },
  },
};
