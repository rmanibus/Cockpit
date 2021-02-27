import React from 'react';
import { useRouter } from 'next/router';
import { Popconfirm, Input, Modal, Layout, Menu, Breadcrumb, Button, Space, PageHeader, Drawer, message } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, SubnodeOutlined, HddOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { ChangesView} from './views/ChangesView';

const { Header, Footer, Sider, Content } = Layout;

type BaseLayoutProps = {
  header: Header;
};
export type Header = {
    title: string;
    extra?: React.ReactNode;
    breadcrumb: Array<Crumb>;
}
type Crumb = {
  path: string;
  breadcrumbName: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ header, children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);
  const [changesOpen, setChangeOpen] = React.useState(false);
  const [saveOpen, setSaveOpen] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState(null);
  const { save, stackId, refresh } = React.useContext<StackContextValue>(StackContext);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const openChanges = () => {
    setChangeOpen(true);
  };
  const closeChanges = () => {
    setChangeOpen(false);
  };
  const openSave =() =>{
    setSaveOpen(true);
  }
  const closeSave =() => {
    setSaveOpen(false);
  }
  const handleSave = () => {
    if(!saveMessage){
      message.error("please set a commit message");
      return;
    }
    save(saveMessage)
    .then(() => {
      message.success("saved !")
    })
    .catch((e) => {
      message.error("failed to save !");
      console.log(e);
    });
    setSaveMessage(null);
    closeSave();
  }
  const handleMenuClick = (e) => {
    router.push(e.key);
  };
  const handleCrumbClick = (target) => () => {
    router.push(target);
  };
  const discard = () => {
    refresh()
    .then(() => {
      message.success('discarded');
    })
    .catch(() => {
      message.error('failed to discard !');
    })
  }
  return (
    <Layout style={{ height: '100vh', width: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >COCKPIT</div>
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
        <PageHeader extra={header.extra} title={header.title} breadcrumbRender={() => <Breadcrumb>
        {header.breadcrumb.map((crumb) => 
          <Breadcrumb.Item style={{cursor: 'pointer'}} onClick={handleCrumbClick(crumb.path)}>{crumb.breadcrumbName}</Breadcrumb.Item>
        )}
        </Breadcrumb>} />
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
        {stackId && (
          <>
          <Footer className="site-layout-background">
            <Button onClick={openChanges}>Changes</Button>
            <Space style={{ float: 'right' }}>
              <Button type="primary" onClick={openSave}>Save</Button>
              <Popconfirm title="Sure to discard ?" onConfirm={discard}>
                <Button danger>Discard</Button>
              </Popconfirm>
            </Space>
          </Footer>
          <Drawer
          width={720}
          destroyOnClose
          title="Changes"
          placement="left"
          visible={changesOpen}
          onClose={closeChanges}
          >
            <ChangesView/>
          </Drawer>
            <Modal title="Commit your Changes" visible={saveOpen} onOk={handleSave} onCancel={closeSave}>
            <Input placeholder="message" value={saveMessage} onChange={(e) => setSaveMessage(e.target.value)} />
          </Modal>
          </>
        )}
      </Layout>
    </Layout>
  );
};
