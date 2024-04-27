import React from 'react';
import { Modal } from 'antd';

const WarningModal = ({ visible, record, onConfirm, onCancel }) => {
  const confirmDelete = () => {
    onConfirm(record);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title="Xác nhận xóa"
      visible={visible}
      onCancel={handleCancel}
      onOk={confirmDelete}
      okText="Xóa"
      cancelText="Hủy"
    >
      <p>Bạn có chắc muốn xóa?</p>
    </Modal>
  );
};

export default WarningModal;
