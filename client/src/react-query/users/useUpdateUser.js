import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useConfirmModal from '../../hooks/useConfirmModal';
import useModal from '../../hooks/useModal';
import { toastSuccess } from '../../utils/toast';

const useUpdateUser = ({ id }) => {
  const { isConfirmed } = useConfirmModal();
  const { handleCloseModal } = useModal();

  const mutationFn = async (data) => {
    await axios({
      method: 'put',
      url: `/api/v1/users/${id}`,
      data,
    });

    return data;
  };

  const onError = () => {
    toastError('Đã xảy ra lỗi khi cập nhật tài khoản');
  };

  const onSuccess = async (data) => {
    queryClient.invalidateQueries(['users']);
    handleCloseModal({ ignoreWarning: true });
    if (data.role === 'admin') {
      await isConfirmed({
        cancelButtonText: 'Ok',
        title: 'Thành công',
        subTitle: `Đã cập nhật quản trị viên: ${data.email}`,
        theme: 'success_modal',
      });
    }

    if (data.role === 'user') {
      toastSuccess('Đã cập nhật người dùng');
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useUpdateUser;
