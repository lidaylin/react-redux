import { getPublishList } from 'src/services/score/publish';
import createModel from './score';
import { transform } from 'src/utils';

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 90,
    render: value => transform.getDate(value),
  },
  {
    title: '姓名',
    dataIndex: 'username',
    width: 90,
  },
  {
    title: '操作内容',
    dataIndex: 'description',
    width: 170,
  },
  {
    title: '发放积分',
    dataIndex: 'score',
    width: 90,
  },
  {
    title: '积分类型',
    dataIndex: 'scoreDesc',
    width: 90,
  },
  {
    title: '公允价值',
    dataIndex: 'fairValue',
    width: 90,
  },
  {
    title: '对应金额',
    dataIndex: 'amount',
    width: 90,
    render: value => (value / 100).toFixed(2),
  },
];
export default createModel('publish', {columns}, getPublishList);
