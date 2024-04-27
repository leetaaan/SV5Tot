import { Button, Space, Dropdown, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Children } from "react";

const InfoColumns = ({ handleEdit, handleDelete, handleViewPersonalInfo }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thành tích",
      children:[
        {
          title: "Đạo đức",
          dataIndex: "morality",
          key: "mỏality",
        },
        {
          title: "Học tập",
          dataIndex: "study",
          key: "study",
        },
        {
          title: "Thể lực",
          dataIndex: "physical",
          key: "physical",
        },
        {
          title: "Tình nguyện",
          dataIndex: "volunteer",
          key: "volunteer",
        },
        {
          title: "Hội nhập",
          dataIndex: "intergration",
          key: "integration",
        },
      ]
    },
    {
      title: "Các thành tích khác",
      key: "other",
      dataIndex: "other"
    },
  ];

  return columns;
};

export default InfoColumns;
