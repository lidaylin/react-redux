import React, { PropTypes } from 'react';
import { Table } from 'antd';
import { systemConstants } from 'src/utils/constants';

export default function List({ columns, dataSource, pagination, loading, onChange, expandedRowRender, rowKey, bordered=false }) {
  const paginationType = {
    showSizeChanger: true,
    pageSizeOptions: systemConstants.pageSizeOption,
  };

  function onPageChange(page) {
    onChange({
      beginDate: page.beginDate,
      pageNo: page.current,
      pageSize: page.pageSize,
      endDate: page.endDate,
    });
  }

  return (
    <Table
      size="middle"
      columns={columns}
      dataSource={dataSource}
      pagination={{ ...paginationType, ...pagination }}
      loading={loading}
      onChange={onPageChange}
      expandedRowRender={expandedRowRender}
      bordered={bordered}
    />
  );
}

List.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  onChange: PropTypes.func,
  pagination: PropTypes.object,
};

List.defaultProps = {
  dataSource: [],
  pagination: {},
  loading: false,
};