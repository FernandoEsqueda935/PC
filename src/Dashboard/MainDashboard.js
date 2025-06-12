import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

const items = [
  { label: "Dashboard", key: 'dashboard' },
  { label: "Dispositivos", key: 'dispositivos' },
  { label: "Sensores", key: 'sensores' }
];

const MainDashboard = ( {children, setPage} ) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{height: '100vh', width: '100vw', display: 'flex', padding: "0px 0px 0px 0px"}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['dashboard']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => {
            setPage(key);
          }}
        />
      </Header>
      <Content style={{ overflow: 'auto' , padding: '24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {children}
      </Content>
    </Layout>
  );
};
export default MainDashboard;