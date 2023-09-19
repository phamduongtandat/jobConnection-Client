import { BrowserRouter } from 'react-router-dom';
import Pagination from './Pagination';

const meta = {
  title: 'table/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Primary = {
  name: 'Pagination',
  args: {
    pagination: {
      currentPage: 7,
      totalPages: 16,
      pageSize: 6,
      matchingResults: 99,
      returnedResults: 6,
    },
  },
};

export default meta;
