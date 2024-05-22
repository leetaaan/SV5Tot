import { Button, Space, Dropdown, Menu } from "antd";
import { EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";

const EventColumns = ({ handleEdit, handleDelete }) => {
  const columns = [
    {
      title: "MSSV",
      dataIndex: "MSSV",
      key: "MSSV",
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "DĐTBB",
      dataIndex: "ddtbb",
      key: "ddtbb",
      children: [
        {
          title: "DDT1",
          dataIndex: "ddt1",
          key: "ddt1",
        },
        {
          title: "DDT2",
          dataIndex: "ddt2",
          key: "ddt2",
        },
        {
          title: "DDT3",
          dataIndex: "ddt3",
          key: "ddt3",
        },
        {
          title: "DDT4",
          dataIndex: "ddt4",
          key: "ddt4",
        },
      ],
    },
    {
      title: "HTTBB",
      dataIndex: "httbb",
      key: "httbb",
      children: [
        {
          title: "HTT1",
          dataIndex: "htt1",
          key: "htt1",
        },
        {
          title: "HTT2",
          dataIndex: "htt2",
          key: "htt2",
        },
        {
          title: "HTT3",
          dataIndex: "htt3",
          key: "htt3",
        },
        {
          title: "HTT4",
          dataIndex: "htt4",
          key: "htt4",
        },
        {
          title: "HTT5",
          dataIndex: "htt5",
          key: "htt5",
        },
      ],
    },
    {
      title: "TLT",
      children: [
        {
          title: "TLT1",
          dataIndex: "tlt1",
          key: "tlt1",
        },
        {
          title: "TLT2",
          dataIndex: "tlt2",
          key: "tlt2",
        },
      ],
    },
    {
      title: "TNT",
      children: [
        {
          title: "TNT1",
          dataIndex: "tnt1",
          key: "tnt1",
        },
        {
          title: "TNT2",
          dataIndex: "tnt2",
          key: "tnt2",
        },
      ],
    },
    {
      title: "HNTBB",
      dataIndex: "hntbb",
      key: "hntbb",
      children: [
        {
          title: "HNT1",
          dataIndex: "hnt1",
          key: "hnt1",
        },
        {
          title: "HNT2",
          dataIndex: "hnt2",
          key: "hnt2",
        },
        {
          title: "HNT3",
          dataIndex: "hnt3",
          key: "hnt3",
        },
      ],
    },
  ];

  return columns;
};

export default EventColumns;
