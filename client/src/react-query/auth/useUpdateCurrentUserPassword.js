import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import axios from '../../config/axios';
import useAuthModal from '../../hooks/useAuthModal';
import useConfirmModal from '../../hooks/useConfirmModal';
import { logUserOut } from '../../store/authSlice';

const useUpdateCurrentUserPassword = () => {
  const { isConfirmed } = useConfirmModal();
  const { handleOpenSignInModal } = useAuthModal();

  const dispatch = useDispatch();

  const mutationFn = async (data) => {
    await axios({
      method: 'put',
      url: '/api/v1/auth/update-password',
      data,
    });
  };

  const onSuccess = async () => {
    const confirm = await isConfirmed({
      confirmButtonText: 'Đăng nhập',
      cancelButtonText: 'Thôi',
      title: 'Bạn đã đổi mật khẩu thành công',
      subTitle: 'Hãy đăng nhập lại',
      theme: 'success_modal',
    });
    if (confirm) handleOpenSignInModal();
    if (!confirm) dispatch(logUserOut());
  };

  const onError = async (error) => {
    if (error?.response?.data?.message !== 'Your password is not correct') {
      await isConfirmed({
        title: 'Không thể đổi mật khẩu',
        subTitle: 'Đã có lỗi xảy ra. Hãy thử lại sau',
        cancelButtonText: 'Ok',
        theme: 'error_modal',
      });
    }
  };

  const mutation = useMutation({
    mutationFn,
    onError,
    onSuccess,
  });

  const updatePassword = async (data) => {
    const confirm = await isConfirmed({
      confirmButtonText: 'Tiếp tục',
      cancelButtonText: 'Thôi',
      title: 'Xác nhận đổi mật khẩu',
      subTitle: 'Bạn sẽ phải đăng nhập lại sau khi thay đổi mật khẩu.',
    });

    if (confirm) {
      mutation.mutate(data);
    }
  };

  return {
    updatePassword,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error?.response?.data?.message,
  };
};

export default useUpdateCurrentUserPassword;
