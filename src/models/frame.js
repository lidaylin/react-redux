import { parse } from 'qs';
import { login, userInfo, logout, menu, crumb } from 'src/services/frame';
import { sidebarJson } from "src/jsondata/sidebarJson.json"
import _ from 'underscore';

function getCrumbData(key, data) {
  this.key = key;
  this.urlKey = key.split(/(?=\/)/);
  this.num = 1;
  this.crumbList = [];
  this.getVal(data, this.urlKey.slice(0, this.num).join(''));
}
getCrumbData.prototype.getVal = function (childData, childKey) {
  const slice = Object.prototype.toString;

  if (slice.call(childData) === '[object Object]') {
      // 路由判断，获取对象
    if (childData.key === childKey) {
      this.crumbList.push({ name: childData.name, key: this.key === childKey ? childKey : '' });
      this.num++;
      this.getVal(childData.child, this.urlKey.slice(0, this.num).join(''));
    }
  } else if (slice.call(childData) === '[object Array]') {
    for (let i = 0; i < childData.length; i++) {
      this.getVal(childData[i], this.urlKey.slice(0, this.num).join(''));
    }
  }
};

export default {
  namespace: 'frame',
  state: {
    login: false,
    userName: '',
    userId: '',
    containerClass: 'layout-container',
    crumbList: [], // 初始化面包屑
    sidebarJson,
    sidebar: {
      className: '',
      current: '',
      switchBoxClassName: 'switch-box',
      sideBarClassName: 'layout-sidebar',
      switchBoxText: '<',
      openKeys: '',
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'getUser' });
      dispatch({ type: 'getMenu' });
      dispatch({ type: 'getCrumbs' });

      history.listen(({ pathname }) => {
        dispatch({
          type: 'pathChange',
          payload: pathname,
        });
      });
    },
  },
  effects: {
    * getMenu({ payload }, { call, put }) {
      const { data, error } = yield call(menu, parse(payload));
      if (data) {
        // yield put({
        //   type: 'menuData',
        //   payload: data,
        // });
      }
    },
    * getUser({}, { call, put }) {
      const { data } = yield call(userInfo);
      if (data) {
        yield put({
          type: 'loginSuccess',
          payload: {
            userName: data.userName,
            userId: data.userId,
          },
        });
      }
    },

    * logout({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload));
      if (data.success) {
        yield put({
          type: 'logoutSuccess',
        });
        yield put({
          type: 'getUser',
        });
      }
    },

    * switchSider({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      });
    },
    * changeNavbar({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' });
      } else {
        yield put({ type: 'hideNavbar' });
      }
    },
    * switchMenuPopver({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      });
    },

  },
  reducers: {

    menuData(state, action) {

      function getData(data) {
        return _.map(
          data,
          (item) => {
            let one = {
              key: item.sUrl,
              name: item.menuName,
            }
            if (item.subMenu && item.subMenu.length > 0) {
              one.child = getData(item.subMenu);
            }
            return one;
          }
        );
      }
      const configData = getData(action.payload);

      return {
        ...state,
        sidebarJson: configData,
      }
    },

    pathChange(state, action) {
      const paths = action.payload.split('/');
      paths.pop();
      paths.shift();
      const keys = [];
      let index = 1;
      const crumbDataList = new getCrumbData(action.payload, sidebarJson);
      do {
        keys.push(`/${paths.slice(0, index).join('/')}`);
        index++;
      } while (index < (paths.length + 1));
      return {
        ...state,
        crumbList: crumbDataList.crumbList,
        sidebar: {
          ...state.sidebar,
          openKeys: keys,
          current: action.payload,
        },
      };
    },

    switchNav(state, action) {
      return {
        ...state,
        navKey: action.payload,
      };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
      };
    },

    handleSwitchSider(state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true,
      };
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false,
      };
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    sidebarSelect(state, action) {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          current: action.payload,
        },
      };
    },
    toggleSidebar(state) {
      let sideBarClassName = 'layout-sidebar';
      let switchBoxText = '<';
      if (state.sidebar.sideBarClassName === sideBarClassName) {
        sideBarClassName = 'layout-sidebar layout-sidebar-hide';
        switchBoxText = '>';
      }
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          sideBarClassName,
          switchBoxText,
        },
      };
    },
    toggleContainer(state) {
      let className = 'layout-container';
      if (state.containerClass === className) {
        className = 'layout-container layout-container-expand';
      }
      return {
        ...state,
        containerClass: className,
      };
    },
  },
};
