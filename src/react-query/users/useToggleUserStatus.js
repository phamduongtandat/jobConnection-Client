import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { toastSuccess } from '../../utils/toast';

const useToggleUserStatus = () => {
  const mutationFn = async (data) => {
    const id = data._id;

    await axios({
      method: 'put',
      url: `/api/v1/users/${id}/user-status`,
      data,
    });

    return data.status;
  };

  const onSuccess = (status) => {
    if (status === 'blocked') toastSuccess('Đã khóa tài khoản');
    if (status === 'active') toastSuccess('Đã mở khóa tài khoản');
  };

  const onError = () => {
    toastError('Cập nhật người dùng thất bại');
  };

  const mutation = useMutation({
    mutationFn,
    onError,
    onSuccess,
  });

  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};

export default useToggleUserStatus;
