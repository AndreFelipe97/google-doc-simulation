import React, { ReactNode, useContext, useEffect } from 'react';
import { Layout, notification, theme } from 'antd';
import { NotificationContext } from '@/contexts/notification';
import { BreadcrumbsLayout } from './breadcrumbs';
import { TitlePageContext } from '@/contexts/PageTitle';
import { Sidebar } from './Sidebar';

const { Header, Content, Footer } = Layout;

interface LayoutDefaultProps {
  children: ReactNode;
}

export function LayoutDefault({ children }: LayoutDefaultProps) {
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Sidebar />
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