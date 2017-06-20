import { list, batchConfirm, download } from 'src/services/money/expend';
import { confirmType, expendType, expendPayType, expendStatus } from 'src/models/money/expend/constants';
import moment from 'moment';
import { transform } from 'src/utils';
import { message } from 'antd';
import { systemConstants } from 'src/utils/constants';
import { reducers, state, dataHandle } from 'src/models/formBase';

export default {
  state: {
    ...state,
    searchParams: {
      beginDate: systemConstants.beginDay,
      endDate: systemConstants.endDay,
      expendType: '-1',
      expendPayType: '-1',
      queryType: '1',
      pageSize: 10,
      pageNo: 1,
    },
    confirmIds: [],
    hasDownload: false,
  },
  effects: {

    * batchOperate({
      payload,
    }, { call, put }) {
      const params = {
        expendIds: payload.ids.join(','),
        auditResult: payload.type,
        rejectReason: payload.reason || '',
      };
      const { data, error } = yield call(batchConfirm, params, payload.url);
      if (!error) {
        yield put({ type: 'query', params: payload.searchParams });
        yield put({
          type: 'afterBatch',
          payload: data,
        });
      }
      else if (error && error.fieldErrors) {
        yield put({
          type: 'putError',
          payload: error.fieldErrors,
        });
      }
    },
  },

  reducers: {
    ...reducers,
    
    afterBatch: function afterBatch(st) {
      message.success('操作成功！');
      return {
        ...st,
        confirmIds: [],
        rejectModalShow: false,
      };
    },

    rejectDialog(st, action) {
      return {
        ...st,
        rejectModalShow: action.visible,
      };
    },

    rowsChange(st, action) {
      return {
        ...st,
        confirmIds: action.ids,
      };
    },

  },
};
