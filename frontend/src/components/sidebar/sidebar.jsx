import { Flex, Menu } from "antd";
import {
  OrderedListOutlined,
  CarryOutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import images from "../../assets/img";


const Sidebar = () => {
  const items = [
    {
      key: "dashboard",
      icon: <ProductOutlined />,
      label: (<Link to='/admin/profile' className="" title="">Danh mục</Link>),
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: (<Link to='/admin/users' className="" title="">Người dùng</Link>),
    },
    {
      key: "criteria",
      icon: <OrderedListOutlined />,
      label: (<Link to='/admin/criterias' className="" title="">Xét duyệt tiêu chí</Link>),
    },
    {
      key: "posts",
      icon: <CarryOutOutlined />,
      label: (<Link to='/admin/posts' className="" title="">Bài viết</Link>),
    },
  ];



  return (
    <>
      <Flex align="center" justify="center">
        <div className="sidebar__logo">
          <img src={images.logo} alt="logo"/>
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="sidebar__menu"
        items = {items}
      />
        
    </>
  );
};

export default Sidebar;
