// UserTable.js
import { Table, Button, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import WarningModal from "../modals/warningModal";
import CriteriaColumns from "../../assets/columns/criteriaColumn";
import CriteriaModal from "../modals/criteriaModal";
import exampleCriteria from "../../assets/json/exampleCriteria";
const UsersTable = () => {
  const [dataSource, setDataSource] = useState([]); //data
  const [isModalVisible, setIsModalVisible] = useState(false); //model
  const [selectedRecord, setSelectedRecord] = useState(null); //
  const [searchText, setSearchText] = useState("");
  const [deleteRecord, setDeleteRecord] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

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

  // handler pagination
  // const totalItem = filteredDataSource.length

  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  // };

  // const paginatedDataSource = filteredDataSource.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );

  return (
    <div className="userTable">
      <div className="userTable__search" style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 8 }}
          allowClear
        />
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button>
      </div>
      <Table
        dataSource={exampleCriteria }
        columns={CriteriaColumns({
          handleEdit,
          handleDelete,
          handleViewPersonalInfo,
        })}
        // pagination={{
        //   current: currentPage,
        //   pageSize: pageSize,
        //   total: totalItem,
        //   onChange: handlePageChange,
        // }
        // }
      />
      <CriteriaModal
        visible={isModalVisible}
        onCreate={handleOk}
        onCancel={handleCancel}
        selectedRecord={selectedRecord}
        columns={CriteriaColumns({
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
