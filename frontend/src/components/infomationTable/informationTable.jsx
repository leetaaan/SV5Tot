import { Table, Button, Space, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import UserModal from "../modals/userModal";
import WarningModal from "../modals/warningModal";
import InfoColumns from "../../assets/columns/infoColumn";
import exampleData from "../../assets/json/exampleData";

const InfomationTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `YOUR_API_ENDPOINT?page=${currentPage}&pageSize=${pageSize}`
      );
      const data = await response.json();
      setDataSource(data.results);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setSelectedRecord(record);
  };

  const handleDelete = (record) => {
    setDeleteRecord(record);
  };

  const confirmDelete = (record) => {
    setDataSource(dataSource.filter((item) => item.key !== record.key));
    setDeleteRecord(null);
  };

  const handleCancelDelete = () => {
    setDeleteRecord(null);
  };

  const handleViewPersonalInfo = (record) => {};

  const handleOk = (values) => {
    const newData = selectedRecord
      ? dataSource.map((item) =>
          item.key === selectedRecord.key ? { ...item, ...values } : item
        )
      : [...dataSource, { ...values, key: Date.now() }];

    setDataSource(newData);
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="infomationTable">
       <div
        className="information flex w-full"
        style={{ marginBottom: 16 }}
      >
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 8 }}
          allowClear
        />
      </div>
      <Table
        dataSource={exampleData}
        columns={InfoColumns({
          handleEdit,
          handleDelete,
          handleViewPersonalInfo,
        })}
        pagination={false}
        scroll={{ x: "calc(700px + 80%", y:700}}
      />
      
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        showSizeChanger
        onShowSizeChange={handleShowSizeChange}
        showQuickJumper
        className="infomationTable__pagination"
      />
      <WarningModal
        visible={!!deleteRecord}
        record={deleteRecord}
        onConfirm={confirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default InfomationTable;
