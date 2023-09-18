import { toast } from 'react-toastify';

export const toastSuccess = (message = 'Hãy thêm nội dung của toast!') => {
  toast.success(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const toastError = (message = 'Hãy thêm nội dung của toast!') => {
  toast.error(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const toastPromise = ({
  promise,
  pending = 'pending message',
  success = 'success message',
  error = 'error message',
}) => {
  if (!promise) alert('Đừng quên thêm promise vào');

  toast.promise(promise, {
    pending,
    success,
    error,
  });
};
