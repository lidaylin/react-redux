import { getCostReportList, downLoadCostReport } from 'src/services/report';
import createModel from '../score/score';
import { transform } from 'src/utils';

const columns = [
  {
    title: '月份',
    dataIndex: 'reportDate',
    width: 90,
    render: value => transform.getDate(value, 'YYYY-MM'),
  },
  {
    title: '含税公允价值',
    dataIndex: 'fairValue',
    width: 90,
  },
  {
    title: '期初剩余可提现积分',
    dataIndex: 'lastRestWithdrawScore',
    width: 90,
  },
  {
    title: '可提现积分',
    children: [
      {
        title: '当期收入可提现积分',
        dataIndex: 'presentIncomeWithdrawScore',
        key: 'presentIncomeWithdrawScore',
        width: 80,
      },
      {
        title: '期末剩余可提现积分',
        dataIndex: 'presentRestWithdrawScore',
        key: 'presentRestWithdrawScore',
        width: 80,
      },
    ]
  },
  {
    title: '已提现积分',
    children: [
      {
        title: '本月提现',
        dataIndex: 'presentWithdrawScore',
        key: 'presentWithdrawScore',
        width: 70,
      },
      {
        title: '金额',
        dataIndex: 'presentWithdrawAmount',
        key: 'presentWithdrawAmount',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
      {
        title: '税额',
        dataIndex: 'presentTax',
        key: 'presentTax',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
      {
        title: '累计提现积分',
        dataIndex: 'totalWithdrawScore',
        key: 'totalWithdrawScore',
        width: 70,
      },
      {
        title: '累计金额',
        dataIndex: 'totalWithdrawAmount',
        key: 'totalWithdrawAmount',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
      {
        title: '累计税额',
        dataIndex: 'totalTax',
        key: 'totalTax',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
    ]
  },
  // java
  // {
  //   title: '查看房源扣减可提现积分',
  //   dataIndex: 'presentWithdrawScore',
  //   key: 'presentWithdrawScore',
  //   width: 100,
  // },
  {
    title: '当期汇总可提现积分检验',
    dataIndex: 'check',
    key: 'check',
    width: 90,
    render: value => value + '',
  },
  
];

export default createModel('cost', { columns: columns, dateType: 'month', bordered: true}, getCostReportList, downLoadCostReport);
