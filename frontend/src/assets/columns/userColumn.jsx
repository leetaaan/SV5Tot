import { Button, Space, Dropdown, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

const UserColumns = ({ handleEdit, handleDelete, handleViewPersonalInfo }) => {
  const columns = [
    {
      title: "Họ Tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Quyền",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Khoa",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
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

export default UserColumns;
