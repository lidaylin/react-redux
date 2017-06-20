import React, { PropTypes } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import './crumbs.less';

function Crumbs({ crumbList }) {
  const breadcrumbItems = crumbList.map(item => (
      item.key ? <Breadcrumb.Item key={item.key}>
        <Link to={item.key}>{ item.name }</Link>
      </Breadcrumb.Item> : <Breadcrumb.Item key={item.key}>
        { item.name }
      </Breadcrumb.Item>
  ));
  return (
    <Breadcrumb separator=">">
      { breadcrumbItems }
    </Breadcrumb>
  );
}

Crumbs.propTypes = {
  crumbList: PropTypes.array.isRequired,
};

export default Crumbs;
