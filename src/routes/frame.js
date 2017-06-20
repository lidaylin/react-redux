import React, { PropTypes } from 'react';
// import { connect } from 'dva'
import { connect } from 'react-redux';

import Header from 'components/common/header';
import Sidebar from 'components/common/sidebar';
import Container from 'components/common/container';
import { config } from '../utils';
import 'css/main.less';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';


// 传Object进去，自动绑dispatch，相当于
// const mapDispatchToProps = (dispatch) => ({
//   handleSidebar: bindActionCreators((className) => ({
//       type: 'frame/expandContainer',
//       payload: className,
//     }), dispatch)
// });
// const mapDispatchToProps = {
//   handleSidebar: (className) => ({
//     type: 'frame/expandContainer',
//     payload: className,
//   })
// };

function Frame({ children, location, dispatch, frame, loading }) {

  const headerProps = {
    userName: frame.userName,
    handleClick(e) {
      dispatch({
        type: 'frame/switchNav',
        payload: e.key,
      });
    },
    logoutPage() {
      window.location.href = 'http://' + window.location.host + "/api/user/logout";
    },
  };

  const sidebarProps = {
    frame,
    handleSelect(e) {
      console.log(e);
      dispatch({
        type: 'frame/sidebarSelect',
        payload: e.key,
      });
    },
    toggleSidebar() {
      dispatch({
        type: 'frame/toggleSidebar',
      });
      dispatch({
        type: 'frame/toggleContainer',
      });
    },
  };

  const containerProps = {
    children,
    containerClass: frame.containerClass,
    crumbList: { crumbList: frame.crumbList },
  };

  return (
    <div className="layout-frame">
      <Spin spinning={ loading.global }>
      </Spin>
      <Header {...headerProps} />
      <Sidebar {...sidebarProps} />
      <Container {...containerProps} />
    </div>
  );
}


Frame.propTypes = {
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  frame: PropTypes.object.isRequired,
};
export default connect(({ frame, loading }) => ({ frame, loading }))(Frame);
