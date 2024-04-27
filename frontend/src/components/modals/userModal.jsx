import React from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = ({ visible, onCreate, onCancel, selectedRecord, columns }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={selectedRecord ? 'Chỉnh sửa thông tin cá nhân' : 'Thêm mới thông tin cá nhân'}
      okText={selectedRecord ? 'Cập nhật' : 'Thêm mới'}
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((errorInfo) => {
            console.log('Validate Failed:', errorInfo);
          });
      }}
    >
      <Form form={form} layout="vertical" initialValues={selectedRecord ? { ...selectedRecord } : {}}>
        {columns.map(column => (
          <Form.Item
            key={column.key}
            name={column.dataIndex}
            label={column.title}
            rules={[{ required: true, message: `Vui lòng nhập ${column.title}!` }]}
          >
            <Input />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default UserModal;
