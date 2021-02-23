import React from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Breadcrumb } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, SubnodeOutlined, UserOutlined, HddOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

type BaseLayoutProps = {
  breadCrumbs: Array<string>;
};
export const BaseLayout: React.FC<BaseLayoutProps> = ({ breadCrumbs, children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    router.push(e.key);
  };
  console.log(breadCrumbs);
  return (
    <Layout style={{ height: '100vh', width: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={[router.pathname]} defaultSelectedKeys={['/']} onClick={handleMenuClick}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="/stacks" icon={<HddOutlined />}>
            Stacks
          </Menu.Item>
          <Menu.Item key="/sources" icon={<SubnodeOutlined />}>
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
          <Breadcrumb>{breadCrumbs && breadCrumbs.map((value) => <Breadcrumb.Item key={value}>{value}</Breadcrumb.Item>)}</Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
