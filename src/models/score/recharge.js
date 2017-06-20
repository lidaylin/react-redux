import { getRechargeList } from '../../services/score/recharge';
import createModel from './score';
import {transform} from 'src/utils';

const payStatusTypes = ['未支付', '支付成功', '支付失败'];
const columns = [
  {
    title: '充值时间',
    dataIndex: 'date',
    width: 170,
    render: value => transform.getDate(value, 'YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '姓名',
    dataIndex: 'username',
    width: 90,
  },
  {
    title: '充值金额',
    dataIndex: 'payAmount',
    width: 90,
    render: value => (value/100).toFixed(2),
  },
  {
    title: '公允价值',
    dataIndex: 'fairValue',
    width: 90,
  },
  {
    title: '积分类型',
    dataIndex: 'scoreDesc',
    width: 90,
  },
  {
    title: '充值积分',
    dataIndex: 'score',
    width: 90,
  },
  {
    title: '充值奖励积分',
    dataIndex: 'awardScore',
    width: 90,
  },
  {
    title: '充值流水号',
    dataIndex: 'rechargeSerialNumber',
    width: 90,
  },
  {
    title: '充值状态',
    dataIndex: 'payStatus',
    width: 90,
    render: value => payStatusTypes[value]
  },
];
export default createModel('recharge', {columns}, getRechargeList);
