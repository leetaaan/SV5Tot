// UserTable.js
import { Table, Button  , Space, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import WarningModal from "../modals/warningModal";
import CriteriaModal from "../modals/criteriaModal";
import exampleCriteria from "../../assets/json/exampleCriteria";
import UserColumns from "../../assets/columns/userColumn";

const UsersTable = () => {
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

  const handleOk = (values) => {
    const newData = selectedRecord
      ? dataSource.map((item) =>
          item.key === selectedRecord.key ? { ...item, ...values } : item
        )
      : [...dataSource, { ...values, key: Date.now() }];

    setDataSource(newData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="usersTable">
      <div className="usersTable__search flex w-full" style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 8 }}
          allowClear
        />
        <div className="userTable__btn">
          <Button className="" type="primary" onClick={handleAdd}>
            Thêm
          </Button>
          <Button className="ml-2 bg-red !important" type="primary" onClick={handleAdd}>
            Xuất file
          </Button>
          <Button className="ml-2 bg-teal" type="primary" onClick={handleAdd}>
            Thêm file
          </Button>
        </div>
      </div>
      <Table
        dataSource={exampleCriteria}
        columns={UserColumns({
          handleEdit,
          handleDelete,
          handleViewPersonalInfo,
        })}
        pagination={false}
        scroll={{ x: "calc(700px + 80%" }}
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
      <CriteriaModal
        visible={isModalVisible}
        onCreate={handleOk}
        onCancel={handleCancel}
        selectedRecord={selectedRecord}
        columns={UserColumns({
          handleEdit,
          handleDelete,
          handleViewPersonalInfo,
        })}
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

export default UsersTable;
