import { systemConstants } from 'src/utils/constants';
import { reducers, state, effects, dataHandle } from 'src/models/formBase';

export default function createModel(type, {columns, dateType='day', isHidden=false, bordered=false}, getList, getDownLoadUrl) {
  return {
    namespace: type,
    state: {
      ...state,
      columns,
      list: [],
      dateType,
      isHidden,
      bordered,
      type,
      downloadUrl: getDownLoadUrl && getDownLoadUrl(),
      searchParams: {
        beginDate: dateType=='month' ? systemConstants.beginMonth : systemConstants.beginDay,
        endDate: dateType=='month' ? systemConstants.endMonth : systemConstants.endDay,
        pageSize: systemConstants.pageSize,
        pageNo: 1,
      },
    },
    effects: {
      ...effects,
      * list({ payload, }, { call, put, select }) {
        const searchParams = yield select(state => state[type]['searchParams']);
        const { data, error } = yield call(getList, {...searchParams});
        yield dataHandle.listHandle({ data, error }, { put });
      },
    },
    reducers: {
      ...reducers,

      showItem(state) {
        return {
          ...state,
          isHidden: false
        };
      },

      hideItem(state) {
        return {
          ...state,
          isHidden: true
        };
      },

    },
  }
}
