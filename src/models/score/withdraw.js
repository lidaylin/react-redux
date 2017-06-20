import { getWithdrawList } from 'src/services/score/withdraw';
import createModel from './score';
import { transform } from 'src/utils';

const columns = [
  {
    title: '日期',
    dataIndex: 'withdrawDate',
    width: 90,
    render: value => transform.getDate(value),
  },
  {
    title: '姓名',
    dataIndex: 'username',
    width: 90,
  },
  {
    title: '积分类型',
    dataIndex: 'scoreDesc',
    width: 90,
  },
  {
    title: '提现积分',
    dataIndex: 'score',
    width: 90,
  },
  {
    title: '公允价值',
    dataIndex: 'fairValue',
    width: 90,
  },
  {
    title: '提现价值',
    dataIndex: 'withdrawValue',
    width: 90,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '应提现',
    dataIndex: 'withdrawAmount',
    width: 90,
    render: value => (value / 100).toFixed(2),
  },
  
  {
    title: '税费',
    dataIndex: 'tax',
    width: 90,
    render: value => (value / 100).toFixed(2),
  },
  {
    title: '实际提现',
    dataIndex: 'withdrawPayAmount',
    width: 90,
    render: value => (value / 100).toFixed(2),
  },
];
export default createModel('withdraw', {columns}, getWithdrawList);
