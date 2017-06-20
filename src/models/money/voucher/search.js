import { list, detail } from 'src/services/money/expend';
import { effects, reducers } from '../expend/model';
import { keyToLabel } from 'src/utils/transform';
import { transform } from 'src/utils';
import { systemConstants } from 'src/utils/constants';
import { state, dataHandle } from 'src/models/formBase';

export default {
  namespace: 'voucherSearch',
  state: {
    ...state,
    detailList: [],
    searchParams: {
      beginDate: systemConstants.beginDay,
      endDate: systemConstants.endDay,
      voucherStatus: '-1',
      no: '',
      voucherDesc: '',
      pageSize: 10,
      pageNo: 1,
    },
    type: 'voucherSearch',
    listDisplay: 'block',
    detailDisplay: 'none',
  },

  effects: {
    ...effects,
    * query({ params }, { call, put }) {
      yield put({ type: 'paramsChange', params });
      const { data, error } = yield call(list, params, '/api/voucher');
      yield dataHandle.listHandle({ data, error }, { put });
    },

    * showDetail({ detailId }, { call, put }) {
      const { data } = yield call(detail, { no: detailId, pageNo: 1, pageSize: 1000 }, '/api/voucher/detail');
      if (data) {
        yield put({
          type: 'detailSuccess',
          payload: data,
        });
      }
    },
  },
  reducers: {
    ...reducers,
    success(state, action) {
      const datas = action.payload.datas;
      const payload = action.payload;
      const { pageNo, pageSize } = state.searchParams;

      datas.forEach((item, index) => {
        const obj = item;
        obj.key = index + new Date().getTime();
        obj.orderNo = index + 1 + ((pageNo - 1) * pageSize);
      });

      return {
        ...state,
        list: datas,
        total: payload.total,
        searchParams: {
          ...state.searchParams,
          pageSize: payload.pageSize,
          pageNo: payload.pageNo,
        },
      };
    },
    detailSuccess(state, action) {
      const datas = action.payload.datas;
      datas.forEach((item, index) => {
        const obj = item;
        obj.key = index + new Date().getTime();
        obj.orderNo = index + 1;
      });
      return {
        ...state,
        listDisplay: 'none',
        detailDisplay: 'inline-block',
        detailList: datas,
      };
    },
    returnList(state, action) {
      return {
        ...state,
        listDisplay: 'block',
        detailDisplay: 'none',
      };
    },

  },
};
