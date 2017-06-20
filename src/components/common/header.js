import React, { PropTypes } from 'react';
import { Menu } from 'antd';
import './header.less';

function Header({ handleClick , logoutPage, userName }) {

  return (
    <div className="layout-header">
      <div className="logo" />
      <div className="proj-title">
      </div>
      <div className="user-info">
        <i className="user-pic" />
        <span className="iconfont icon-user"></span>
        <div className="user-name">{userName}</div>
        <a href="javascript:;" className="user-logout" onClick={logoutPage}>退出</a>
      </div>
    </div>
  );
}

Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  logoutPage: PropTypes.func.isRequired,
};

export default Header;
