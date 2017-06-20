import { getUseList } from '../../services/score/use';
import createModel from './score';
import { transform } from 'src/utils';

const columns = [
  {
    title: '时间',
    dataIndex: 'useTime',
    key: 'useTime',
    width: 70,
    render: value => transform.getDate(value),
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
    width: 70,
  },
  {
    title: '业务流水号',
    dataIndex: 'orderId',
    key: 'orderId',
    width: 120,
  },
  {
    title: '操作内容',
    dataIndex: 'description',
    key: 'description',
    width: 170,
  },
  {
    title: '使用总积分',
    dataIndex: 'totalScore',
    key: 'totalScore',
    width: 90,
  },
  {
    title: '对应总金额',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    width: 90,
    render: value => (value / 100).toFixed(2),
  },
];
export default createModel('use', {columns}, getUseList);
