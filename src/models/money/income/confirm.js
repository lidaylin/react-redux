import { list, entering, download } from 'src/services/money/income';
import { transform } from 'src/utils';
import { incomeType, incomePayType, incomeStatus } from './constants';
import { reducers, state, dataHandle } from 'src/models/formBase';
import { message } from 'antd';

export default {
  namespace: 'incomeModal',
  state: {
    ...state,
    type: 'incomeModal',
    columns: [{
      title: '序号',
      dataIndex: 'antOrderNumber',
      width: 20,
    }, {
      title: '收入类型',
      dataIndex: 'incomeType',
      width: 70,
      render: value => incomeType[value] || '',
    }, {
      title: '收入金额',
      dataIndex: 'incomeAmount',
      width: 70,
      render: value => (value / 100).toFixed(2),
    }, {
      title: '付款人',
      dataIndex: 'incomePayUserName',
      width: 70,
    }, {
      title: '付款方式',
      dataIndex: 'incomePayType',
      width: 70,
      render: value => incomePayType[value] || '',
    }, {
      title: '收入状态',
      dataIndex: 'incomeStatus',
      width: 70,
      render: value => incomeStatus[value] || '',
    }, {
      title: '收入日期',
      dataIndex: 'incomeDate',
      width: 70,
      render: value => transform.getDate(value),
    }],
    searchParams: {
      ...state.searchParams,
      incomeType: '-1',
      incomeStatus: '-1',
    },
    inputIncomeVisible: false,
    entryModalShow: false,
  },
  effects: {

    * query({ payload }, { call, put }) {
      yield put({ type: 'paramsChange', payload });
      const { data, error } = yield call(list, payload.params, '/api/income/confirm');
      yield dataHandle.listHandle({ data, error }, { put });
    },

    * entryIncome({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data, error } = yield call(entering, payload.postParams, '/api/income');
      if (!error) {
        yield put({ type: 'query', payload: { params: payload.searchParams } });
        message.success('录入成功！');
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
        entryModalShow: action.visible,
      };
    },

    entrySuccess: function entrySuccess(state) {
      return {
        ...state,
        entryModalShow: false,
      };
    },

  },
};
