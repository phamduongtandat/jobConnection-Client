import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axios from '../../config/axios';
import useAuthModal from '../../hooks/useAuthModal';
import useConfirmModal from '../../hooks/useConfirmModal';

const useResetPasswordWithToken = () => {
  const { isConfirmed } = useConfirmModal();
  const { handleOpenSignInModal, handleCloseAuthModal } = useAuthModal();
  const resetPasswordToken = useSelector(
    (state) => state.auth.resetPasswordToken,
  );

  const mutationFn = async (data) => {
    await axios({
      method: 'put',
      url: `/api/v1/auth/reset-password/${resetPasswordToken}`,
      data,
    });
  };

  const onSuccess = async () => {
    handleCloseAuthModal();
    const confirm = await isConfirmed({
      title: 'Thành công',
      subTitle:
        'Mật khẩu đã được thay đổi thành công. Bạn có thể đăng nhập với mật khẩu mới.',
      confirmButtonText: 'Đăng nhập',
      cancelButtonText: 'Đóng',
      theme: 'success_modal',
    });
    if (confirm) {
      handleOpenSignInModal();
    }
  };

  const onError = async (error) => {
    const message = error?.response?.data?.message;

    if (message === 'The token is expired') return;
    handleCloseAuthModal();
    await isConfirmed({
      title: 'Đã có lỗi xảy ra',
      subTitle: 'Có lỗi xảy ra khi thay đổi mật khẩu. Hãy thử lại.',
      cancelButtonText: 'Đóng',
      theme: 'error_modal',
    });
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  const resetPasswordWithToken = (data) => {
    if (resetPasswordToken) {
      mutation.mutate(data);
    }
  };

  return {
    resetPasswordWithToken,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error?.response?.data?.message,
  };
};

export default useResetPasswordWithToken;
