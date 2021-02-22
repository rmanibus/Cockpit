import React from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export const BaseLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    router.push(e.key);
  };

  return (
    <Layout style={{ height: '100vh', width: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={[router.pathname]} defaultSelectedKeys={['/']} onClick={handleMenuClick}>
        <Menu.Item key="/" icon={<UserOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="/stacks" icon={<UserOutlined />}>
            Stacks
          </Menu.Item>
          <Menu.Item key="/sources" icon={<VideoCameraOutlined />}>
            Sources
          </Menu.Item>
          <Menu.Item key="/settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
