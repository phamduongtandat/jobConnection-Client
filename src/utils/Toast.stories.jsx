import { ToastContainer } from 'react-toastify';
import { toastError, toastSuccess } from './toast';

const meta = {
  title: 'components/Toast',
};

export const Primary = {
  name: 'Toast',
  render: () => (
    <>
      <p className="mb-6">Import toast.js ở trong folder utils để sử dụng</p>
      <ToastContainer />
      <button
        className="block px-6 py-2 bg-primary mb-6"
        onClick={() => toastSuccess('Thông báo thành công')}
      >
        Open success toast
      </button>
      <button
        className="block px-6 py-2 bg-error mb-6"
        onClick={() => toastError('Thông báo thất bại')}
      >
        Open error toast
      </button>
    </>
  ),
};

export default meta;
