import { Avatar, Flex, Typography } from "antd"
import Search from "antd/es/input/Search"
import {MessageOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'

const Navbar = () => {
  return (
   <Flex align="center" justify='space-between'>
    <Typography.Title level={3} type='secondary' className="navbar-title">
      Sinh vien 5 tot
    </Typography.Title>

    <Flex align='center' gap='3rem'>
      <Flex className="navbar-icon">
        <MessageOutlined className='navbar-icon--style'/>
        <NotificationOutlined className='navbar-icon--style'/>
        <Avatar icon={<UserOutlined/>} className='navbar-icon--style'/>
      </Flex>
    </Flex>
   </Flex>
  )
}

export default Navbar
