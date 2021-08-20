import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, Link } from 'umi';

import RightContent from '@/components/RightContent';

import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/mock-api/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import logo from '../src/assets/vote.svg';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
}
export const request = {
  errorHandler: (error) => {
    const { response } = error;

    if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: 'Error!',
      });
    }

    throw error;
  },
}; // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState }) => {
  return {
    logo: logo,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
