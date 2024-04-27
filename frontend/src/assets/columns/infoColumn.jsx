import { Button, Space, Dropdown, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

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
      width: "15%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Dân tộc",
      dataIndex: "ethnic",
      key: "ethnic",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15%",
    },
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      width: "10%",
    },
    {
      title: "Khoa",
      dataIndex: "department",
      key: "department",
      width: "15%",
    },
    {
      title: "Chỉnh sửa",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
          <Button onClick={() => handleViewPersonalInfo(record)}>
            <UserOutlined />
          </Button>
        </Space>
      ),
      width: "10%",
    },
  ];

  return columns;
};

export default InfoColumns;
