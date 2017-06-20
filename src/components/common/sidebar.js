import { Menu, Icon } from 'antd';
import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import './sidebar.less';

const SubMenu = Menu.SubMenu;

function SideBar({ handleSelect, toggleSidebar, frame }) {
  const sidebar = frame.sidebar;
  const sidebarJson = frame.sidebarJson;
  
  function pMenu(menuItem) {
    if (menuItem.child) {
      return (
        <SubMenu key={menuItem.key} title={<span>{menuItem.name}</span>} >
          {
            menuItem.child.map(subMenuItem => pMenu(subMenuItem))
          }
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={menuItem.key}><Link to={menuItem.key}>{menuItem.name}</Link></Menu.Item>
    );
  }

  return (
    <aside className={sidebar.sideBarClassName}>
      <a className={sidebar.switchBoxClassName} id="J-switch-box" onClick={toggleSidebar}>{sidebar.switchBoxText}</a>
      <Menu theme={frame.theme} onSelect={handleSelect} defaultOpenKeys={sidebar.openKeys} selectedKeys={[sidebar.current]} mode="inline">
        {sidebarJson.map(menuItem => pMenu(menuItem))}
      </Menu>
    </aside>
  );
}

SideBar.propTypes = {
  frame: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default SideBar;
