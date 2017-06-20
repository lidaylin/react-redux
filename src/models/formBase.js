import { systemConstants } from 'src/utils/constants';
import { message } from 'antd';

const constants = {
  state: {
    fieldErrors: {},
    total: 0,
    searchParams: {
      beginDate: systemConstants.beginMonth,
      endDate: systemConstants.endMonth,
      pageSize: systemConstants.pageSize,
      pageNo: 1,
    },
  },

  effects: {

  },

  reducers: {
    paramsChange(state, action) {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      };
    },

    putError(state, action) {
      return {
        ...state,
        fieldErrors: action.payload,
      };
    },

    success(state, action) {
      const { pageNo, pageSize } = state.searchParams;
      const datas = action.payload.datas.map(
        (item, index) => ({
          ...item,
          key: index + new Date().getTime(),
          antOrderNumber: index + 1 + ((pageNo - 1) * pageSize),
        }),
      );

      return {
        ...state,
        list: datas,
        total: action.payload.total,
        searchParams: {
          ...state.searchParams,
          pageNo: action.payload.pageNo,
          pageSize: action.payload.pageSize,
        },
      };
    },
  },

  dataHandle: {
    * listHandle({ data, error }, { put }) {
      yield put({
        type: 'putError',
        payload: {},
      });
      if (data) {
        yield put({
          type: 'success',
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
};

export default constants;
