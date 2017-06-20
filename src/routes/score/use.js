import { connect } from 'dva';
import React, { PropTypes } from 'react';
import Score from 'components/views/score';
import { Table } from 'antd';

function Use({ dispatch, use }) {

  const expandedRowRender = (one) => {
    const columns = [
      { title: '积分类型', dataIndex: 'scoreDesc', key: 'scoreDesc', width: 90 },
      { title: '积分数量', dataIndex: 'score', key: 'score', width: 90 },
      { title: '公允价值', dataIndex: 'fairValue', key: 'fairValue', width: 90 },
      { title: '对应金额', dataIndex: 'amount', key: 'amount', width: 90,
        render: value => (value / 100).toFixed(2),
      },
    ];

    const details = one.details || [];

    const dataSource = details.map((item, index) => {
      return { ...item, key: index};
    });

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    );
  };
  return (
    <Score config={{ ...use, expandedRowRender }} dispatch={ dispatch } />
  );
}

export default connect(({ use }) => ({ use }))(Use);
