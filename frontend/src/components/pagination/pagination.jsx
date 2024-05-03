import { Pagination } from 'antd';

const PaginationCommon = ({}) => (
  <Pagination
    total={85}
    showSizeChanger
    showQuickJumper
    showTotal={(total) => `Total ${total} items`}
  />
);
export default PaginationCommon;