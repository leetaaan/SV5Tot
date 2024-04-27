// Sidebar.js
import { Flex, Menu } from "antd";
import { FaLeaf } from "react-icons/fa";
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import UserTable from "../usersTable/usersTable";
import CriteriaTable from "../criteriaTable/criteriaTable";
import { render } from "react-dom";
import Profile from "../profile/profile";

const Sidebar = ({ onSelect }) => {
  const items = [
    {
      key: "1",
      icon: <CarryOutOutlined />,
      label: "Danh mục",
      render: <Profile />,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Thông tin sinh viên",
      render: <UserTable />,
    },
    {
      key: "3",
      icon: <OrderedListOutlined />,
      label: "Thành tích sinh viên",
      render: <CriteriaTable />,
    },
    {
      key: "4",
      icon: <SettingOutlined />,
      label: "Quản lý tài khoản",
    },
    {
      key: "5",
      icon: <ProfileOutlined />,
      label: "Thông tin cá nhân",
    },
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleItemClick = (item) => {
    onSelect(item.render);
  };

  return (
    <>
      <Flex align="center" justify="center">
        <div className="sidebar__logo">
          <FaLeaf />
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items.map((item) => ({
          ...item,
          onClick: () => handleItemClick(item),
        }))}
        className="sidebar__menu"
      />
    </>
  );
};

export default Sidebar;
