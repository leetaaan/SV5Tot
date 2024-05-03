// Home.js
import { Button, Layout, Pagination } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState,useEffect, Children } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Profile from "../../components/profile/profile";
import { Footer } from "antd/es/layout/layout";

const { Sider, Header, Content } = Layout;

const Admin = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(!!window.scrollY);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);


  return (
    <Layout className="home">
      <Sider
        theme="dark"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="home__sider"
      >
        <Sidebar/>
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
        <Content className="home__content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
