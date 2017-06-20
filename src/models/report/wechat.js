import {
  getAccountWeixinList,
  downLoadAccountWeixin,
} from 'src/services/report';
import createModel from '../score/score';
import moment from 'moment';

const columns = [
  {
    title: '日期',
    dataIndex: 'reportDate',
    width: 150,
    render: (value) => {
      return moment(parseInt(value, 10)).format('YYYY-MM');
    },
  },
  {
    title: '期初余额',
    dataIndex: 'beginAmount',
    width: 150,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '转入微信',
    dataIndex: 'payAmount',
    width: 150,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '提现金额',
    dataIndex: 'withdrawAmount',
    width: 150,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '期末金额',
    dataIndex: 'endAmount',
    width: 150,
    render: value => (value / 100).toFixed(2),
  },
];

function changeItem(state, action) {
  var model = modelKey[action.payload];
}

export default createModel('wechat', { columns }, getAccountWeixinList, downLoadAccountWeixin);
