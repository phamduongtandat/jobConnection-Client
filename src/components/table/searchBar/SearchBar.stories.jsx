import { BrowserRouter } from 'react-router-dom';
import Component from './SearchBar';

const meta = {
  // component: Component,
  title: 'table/SearchBar',
};

export const SearchBar = () => (
  <BrowserRouter>
    <p>// Xem ví dụ ở trang quản lí user</p>
    <p className="mb-6">
      // Tự động thêm ?keyword= vào thành url khi submit form
    </p>
    <Component />
  </BrowserRouter>
);

export default meta;
