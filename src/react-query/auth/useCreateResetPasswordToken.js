import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import useAuthModal from '../../hooks/useAuthModal';
import useConfirmModal from '../../hooks/useConfirmModal';

const useCreateResetPasswordToken = () => {
  const { isConfirmed } = useConfirmModal();
  const { handleCloseAuthModal } = useAuthModal();

  const mutationFn = async (data) => {
    await axios({
      method: 'post',
      url: '/api/v1/auth/reset-password-token',
      data,
    });
  };

  const onError = async (error) => {
    const message = error.response?.data?.message;
    if (message === 'Can not find user with provided email') return;

    handleCloseAuthModal();
    await isConfirmed({
      cancelButtonText: 'Ok',
      title: 'Có lỗi đã xảy ra',
      subTitle:
        'Không thể gửi email để đổi mật khẩu. Hãy thử lại một lần nữa hoặc liên hệ với support.',
      theme: 'error_modal',
    });
  };

  const onSuccess = async () => {
    handleCloseAuthModal();

    await isConfirmed({
      cancelButtonText: 'Ok',
      title: 'Hãy kiểm tra hộp thư',
      subTitle: 'Đường link thay đổi mật khẩu đã được gửi tới email của bạn.',
      theme: 'success_modal',
    });
  };

  const mutation = useMutation({
    mutationFn,
    onError,
    onSuccess,
  });

  return {
    createResetPasswordToken: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error?.response?.data?.message,
  };
};

export default useCreateResetPasswordToken;
