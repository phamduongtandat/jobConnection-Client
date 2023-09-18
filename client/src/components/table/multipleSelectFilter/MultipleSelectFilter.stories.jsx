import { BrowserRouter } from 'react-router-dom';
import MultipleSelectFilter from './MultipleSelectFilter';

const meta = {
  title: 'table/MultipleSelectFilter',
  component: MultipleSelectFilter,
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <p>// Xem ví dụ ở trang quản lí user</p>
          <p className="mb-6">// Thêm các filter vào url dựa theo bộ lọc</p>
          <Story />
        </BrowserRouter>
      );
    },
  ],
};

export const Primary = {
  name: 'MultipleSelectFilter',
  args: {
    fieldName: 'account_type',
    options: [
      { value: 'admin', name: 'Quản trị viên' },
      { value: 'business', name: 'Nhà tuyển dụng' },
      { value: 'personal', name: 'Người lao động' },
    ],
  },
};

export default meta;
