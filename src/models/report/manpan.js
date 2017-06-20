import {
  getAccountManpanList,
  downLoadAccountManpan,
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
    title: '业务收入',
    dataIndex: 'businessIncome',
    width: 150,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '自有转入',
    dataIndex: 'privateIncome',
    width: 150,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '业务支出',
    dataIndex: 'businessExpend',
    width: 150,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '转出微信',
    dataIndex: 'wechatWithdraw',
    width: 150,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '自有转出',
    dataIndex: 'privateExpend',
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

export default createModel('manpan', { columns, isHidden: true }, getAccountManpanList, downLoadAccountManpan);
