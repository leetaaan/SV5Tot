import { Button, Space, Dropdown, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

const BlogColumns = ({ handleEdit, handleDelete, handleViewPersonalInfo }) => {
  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ảnh bìa",
      dataIndex: "banner",
      key: "banner",
      render: (text) => <img src={text} alt="Banner" style={{ width: 100 }} />,
    },
    {
      title: "Mô tả",
      dataIndex: "des",
      key: "des",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (content) => <div>{content.join(", ")}</div>, // Adjust based on how you want to display the content
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => tags.join(", "),
    },
    {
      title: "Danh mục",
      dataIndex: "categories",
      key: "categories",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Bình luận",
      dataIndex: "comments",
      key: "comments",
      render: (comments) => comments.length, // Or any other way you want to display comments
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

export default BlogColumns;
