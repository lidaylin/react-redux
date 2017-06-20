import moment from 'moment';
import { transform } from 'src/utils';
import { searchConstants } from './constants';
import { incomeType, incomePayType, incomeStatus } from './constants';
import { list, entering, download } from 'src/services/money/income';
import { systemConstants } from 'src/utils/constants';
import { reducers, state, dataHandle } from 'src/models/formBase';

export default {
  namespace: 'incomeSearchModel',
  state: {
    ...state,
    type: 'incomeSearchModel',
    columns: [
      {
        title: '序号',
        dataIndex: 'no',
        width: 20,
      },
      {
        title: '收入日期',
        dataIndex: 'incomeDate',
        key: 'incomeDate',
        width: 70,
        render: value => transform.getDate(value),
      },
      {
        title: '收入类型',
        dataIndex: 'incomeType',
        key: 'incomeType',
        width: 70,
        render: value => incomeType[value] || '',
      },
      {
        title: '收入金额',
        dataIndex: 'incomeAmount',
        key: 'incomeAmount',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
      {
        title: '付款人',
        dataIndex: 'incomePayUserName',
        key: 'incomePayUserName',
        width: 70,
      },
      {
        title: '付款方式',
        dataIndex: 'incomePayType',
        key: 'incomePayType',
        width: 70,
        render: value => incomePayType[value] || '',
      },
      {
        title: '收入状态',
        dataIndex: 'incomeStatus',
        key: 'incomeStatus',
        width: 70,
        render: value => incomeStatus[value] || '',
      },
    ],
    searchParams: {
      incomeType: '-1',
      incomePayType: '-1',
      beginDate: systemConstants.beginDay,
      endDate: systemConstants.endDay,
      pageSize: systemConstants.pageSize,
      pageNo: 1,
    },
  },
  effects: {

    * query({ payload }, { call, put }) {
      yield put({ type: 'paramsChange', payload });
      const { data, error } = yield call(list, payload.params, payload.url);

      yield dataHandle.listHandle({ data, error }, { put });
    },

  },
  reducers: {

    ...reducers,

    success(state, action) {
      const { pageNo, pageSize, datas } = action.payload;

      datas.forEach((item, index) => {
        const obj = item;
        obj.key = index + new Date().getTime();
        obj.no = index + 1 + ((pageNo - 1) * pageSize);
      });

      return {
        ...state,
        list: datas,
        total: action.payload.total,
        searchParams: {
          ...state.searchParams,
          pageNo: pageNo,
          pageSize: pageSize,
        },
      };
    },

  },
};
