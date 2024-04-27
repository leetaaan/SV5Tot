// Home.js
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Profile from "../../components/profile/profile";

const { Sider, Header, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<Profile />);

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="home">
      <Sider
        theme="drak"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="home__sider"
      >
        <Sidebar onSelect={handleSelectComponent} />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleToggle}
          className="trigger-btn"
        />
      </Sider>
      <Layout>
        <Header className="home__header">
          <Navbar />
        </Header>
        <Content className="home__content">{selectedComponent}</Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
