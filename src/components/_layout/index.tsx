import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  FormOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, notification, theme } from 'antd';
import { useRouter } from 'next/router';
import { NotificationContext } from '@/contexts/notification';
import { BreadcrumbsLayout } from './breadcrumbs';
import BreadcrumbsProvider, { BreadcrumbsContext } from '@/contexts/breadcrumbs';
import { TitlePageContext } from '@/contexts/PageTitle';

const { Header, Content, Footer, Sider } = Layout;

interface LayoutDefaultProps {
  children: ReactNode;
}

export function LayoutDefault({ children }: LayoutDefaultProps) {
  const [collapsed, setCollapsed] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const { state, message, description } = useContext(NotificationContext);
  const { title } = useContext(TitlePageContext);

  useEffect(() => {
    api[state ? state : 'info']({
      message: state ? message : 'Bem-vindo',
      description: state ? description : '',
    });
  }, [api, description, message, state]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const { setBreadcrumbsType } = useContext(BreadcrumbsContext)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={[
          {
            key: '1',
            icon: <UnorderedListOutlined />,
            label: 'Lista de arquivos',
            onClick: () => {
              setBreadcrumbsType(['Lista de arquivos'])
              router.push('/')
            }
          },
          {
            key: '2',
            icon: <FormOutlined />,
            label: 'Cadastrar arquivo',
            onClick: () => {
              setBreadcrumbsType(['Cadastrar arquivo'])
              router.push('/file/add')
            }
          },
        ]} />
      </Sider>
      <Layout>
        <Header style={{
          padding: '0 20px 0',
          background: colorBgContainer,
          fontSize: 20,
          fontWeight: 'bold'
        }}
        >
          {title}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <BreadcrumbsLayout />
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>André ©2023</Footer>
      </Layout>
    </Layout>
  );
};