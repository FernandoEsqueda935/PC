import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
const items = Array.from({ length: 6 }).map((_, index) => ({
  key: index + 1,
  label: `sensor ${index + 1}`,
}));
const MainDashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{height: '100vh', width: '100vw', display: 'flex'}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Consumos.
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
          Proyecto de carrera
      </Footer>
    </Layout>
  );
};
export default MainDashboard;