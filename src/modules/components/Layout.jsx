import logo from '@/assets/logo.svg';
import {
  CloseOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSecurity } from '../security/useSecurity';
import { useBreakpoint } from './useBreakpoint';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const _navigate = useNavigate();
  const breakpoint = useBreakpoint();
  const { signOut, credentials } = useSecurity();

  const isMobile = useMemo(() => ['xs', 'sm'].includes(breakpoint || ''), [breakpoint]);

  const navigate = useCallback(
    (path) => {
      if (isMobile) {
        _navigate(path);
        setCollapsed(true);
      } else {
        _navigate(path);
      }
    },
    [isMobile, _navigate, setCollapsed],
  );

  const adminOptions = [
    {
      key: '/role-applications',
      icon: <UserOutlined />,
      label: 'Applications',
      onClick: () => {
        navigate('/role-applications');
      },
    },
  ];

  return (
    <Layout>
      <Sider
        style={
          isMobile
            ? {
                background: colorBgContainer,
                overflow: 'auto',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1,
              }
            : { background: colorBgContainer }
        }
        width={isMobile ? '100vw' : 256}
        collapsible
        trigger={null}
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
        }}
      >
        <div
          className={clsx('m-4 flex h-8 items-center ', !isMobile && 'justify-center', isMobile && 'justify-between')}
        >
          <img src={logo} className={isMobile ? 'pl-2' : ''} />

          {isMobile && <CloseOutlined className="px-4 [&>svg]:fill-white" onClick={() => setCollapsed(!collapsed)} />}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className="![border-inline-end:none]"
          items={[
            {
              key: '/dashboard',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => {
                navigate('/dashboard');
              },
            },
            ...(credentials?.isAdmin && !credentials.isManager ? adminOptions : []),
            {
              key: '/text-blasts',
              icon: <MailOutlined />,
              label: 'Text Blasts',
              onClick: () => {
                navigate('/text-blasts');
              },
            },
            {
              key: '/user-profiles',
              icon: <UserOutlined />,
              label: 'User Profiles',
              onClick: () => {
                navigate('/user-profiles');
              },
            },
            {
              key: '/events',
              icon: <PictureOutlined />,
              label: 'Events',
              onClick: () => {
                navigate('/events');
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex items-center justify-between">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            role: 'button',
            className: 'py-0 px-6 text-lg cursor-pointer leading-[64px] transition-colors hover:text-[#1890ff]',
            onClick: () => setCollapsed(!collapsed),
          })}
          <LogoutOutlined
            role="button"
            className="cursor-pointer px-6 py-0 text-lg leading-[64px] transition-colors hover:text-[#1890ff]"
            onClick={() => signOut().then(() => _navigate('/login'))}
          />
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export { Layout };