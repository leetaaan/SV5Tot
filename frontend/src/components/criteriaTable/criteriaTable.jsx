// UserTable.js
import { Table, Button, Space, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import WarningModal from "../modals/warningModal";
import CriteriaColumns from "../../assets/columns/criteriaColumn";
import { Link } from "react-router-dom";

const CriteriaTable = () => {
  const [dataSource, setDataSource] = useState([]); //data
  const [isModalVisible, setIsModalVisible] = useState(false); //model
  const [selectedRecord, setSelectedRecord] = useState(null); //
  const [searchText, setSearchText] = useState("");
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
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

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const filteredDataSource = dataSource.filter(
    (item) =>
      item.daoduc &&
      item.ten.toLowerCase().includes(searchText.toLowerCase()) &&
      item.theluc &&
      item.unit.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); 
  };

  return (
    <div className="usersTable">
      <div
        className="usersTable__search flex w-full"
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
        dataSource={dataSource}
        columns={CriteriaColumns({
          handleEdit,
          handleDelete,
          handleViewPersonalInfo,
        })}
        pagination={false}
        scroll={{ x: "calc(700px + 80%)", y: 700 }}
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

export default CriteriaTable;
