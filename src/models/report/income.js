import { getIncomeReportList, downLoadIncomeReport } from 'src/services/report';
import createModel from '../score/score';
import { transform } from 'src/utils';

const columns = [
  {
    title: '月份',
    dataIndex: 'reportDate',
    width: 90,
    key: 'reportDate',
    render: value => transform.getDate(value, 'YYYY-MM'),
  },
  {
    title: '公允价值',
    dataIndex: 'fairValue',
    key: 'fairValue',
    width: 70,
  },
  {
    title: '期初充值剩余积分',
    dataIndex: 'lastRestScore',
    key: 'lastRestScore',
    width: 70,
  },
  {
    title: '当期充值',
    children: [
      {
        title: '充值积分',
        dataIndex: 'presentIncomeScore',
        key: 'presentIncomeScore',
        width: 70,
      },
      {
        title: '奖励积分',
        dataIndex: 'presentIncomeAwardScore',
        key: 'presentIncomeAwardScore',
        width: 70,
      },
      {
        title: '充值金额（元）',
        dataIndex: 'presentIncomeAmount',
        key: 'presentIncomeAmount',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
    ]
  },
  {
    title: '累计充值',
    children: [
      {
        title: '充值积分',
        dataIndex: 'totalIncomeScore',
        key: 'totalIncomeScore',
        width: 70,
      },
      {
        title: '奖励积分',
        dataIndex: 'totalIncomeAwardScore',
        key: 'totalIncomeAwardScore',
        width: 70,
      },
      {
        title: '充值金额（元）',
        dataIndex: 'totalIncomeAmount',
        key: 'totalIncomeAmount',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
    ]
  },
  {
    title: '当期使用充值积分',
    children: [
      {
        title: '积分',
        dataIndex: 'presentUseScore',
        key: 'presentUseScore',
        width: 70,
      },
      {
        title: '金额（元）',
        dataIndex: 'presentUseAmount',
        key: 'presentUseAmount',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
    ]
  },
  {
    title: '累计使用充值积分',
    children: [
      {
        title: '积分',
        dataIndex: 'totalUseScore',
        key: 'totalUseScore',
        width: 70,
      },
      {
        title: '金额（元）',
        dataIndex: 'totalUseAmount',
        key: 'totalUseAmount',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
    ]
  },
  {
    title: '期末充值剩余积分',
    children: [
      {
        title: '剩余积分',
        dataIndex: 'presentRestScore',
        key: 'presentRestScore',
        width: 70,
      },
      {
        title: '剩余积分价值',
        dataIndex: 'presentRestScoreValue',
        key: 'presentRestScoreValue',
        width: 70,
        render: value => (value / 100).toFixed(2),
      },
    ]
  },
  {
    title: '充值剩余积分检验',
    dataIndex: 'checkScore',
    key: 'checkScore',
    width: 70,
  },
];

const dateType = 'month';
export default createModel('income', { columns, dateType, bordered: true }, getIncomeReportList, downLoadIncomeReport);
