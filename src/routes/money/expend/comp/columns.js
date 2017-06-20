import { expendType, expendPayType, expendStatus, expendAuditResult, expendReauditResult } from 'src/models/money/expend/constants';
import { transform } from 'src/utils';

const columns = [{
  title: '序号',
  dataIndex: 'antOrderNumber',
  width: 30,
}, {
  title: '申请日期',
  dataIndex: 'expendApplyDate',
  width: 70,
  render: value => transform.getDate(value),
}, {
  title: '支出类型',
  dataIndex: 'expendType',
  render: value => expendType[value] || '',
  width: 70,
}, {
  title: '支出金额',
  dataIndex: 'expendAmount',
  width: 70,
  render: value => (value / 100).toFixed(2),
}, {
  title: '收款人',
  dataIndex: 'expendIncomeUserName',
  width: 70,
}, {
  title: '支出方式',
  dataIndex: 'expendPayType',
  width: 70,
  render: value => expendPayType[value] || '',
}, {
  title: '支出状态',
  dataIndex: 'expendStatus',
  width: 70,
  render: value => expendStatus[value] || '',
}];
const searchColumns = columns.concat(
  [{
    title: '支出日期',
    dataIndex: 'expendPayTime',
    key: 'expendPayTime',
    width: 70,
    render: value => transform.getDate(value),
  }, {
    title: '经办结果',
    dataIndex: 'expendAuditResult',
    width: 70,
    render: value => expendAuditResult[value] || '',
  }, {
    title: '经办日期',
    dataIndex: 'expendAuditTime',
    width: 70,
    render: value => transform.getDate(value),
  }, {
    title: '复核结果',
    dataIndex: 'expendReauditResult',
    width: 70,
    render: value => expendReauditResult[value] || '',
  }, {
    title: '复核日期',
    dataIndex: 'expendReauditTime',
    width: 70,
    render: value => transform.getDate(value),
  }],
);

export default {
  columns,
  searchColumns,
};
